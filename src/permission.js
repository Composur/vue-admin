import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import {componentsMap} from '@/router/componentsMap'
import Layout from "@/layout";
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

function convertRouter(asyncRouterMap) {
  const accessedRouters = [];
  if (asyncRouterMap) {
    asyncRouterMap.forEach(item => {
      var parent = generateRouter(item, true);
      var children = [];
      if (item.children) {
        item.children.forEach(child => {
          children.push(generateRouter(child, false));
        });
      }
      parent.children = children;
      accessedRouters.push(parent);
    });
  }
  accessedRouters.push({ path: "*", redirect: "/404", hidden: true });
  return accessedRouters;
}

function generateRouter(item, isParent) {
  var router = {
    path: item.path,
    name: item.name,
    meta: item.meta,
    // component: isParent ? Layout : () => import(item.component)
    component: isParent ? Layout : componentsMap[item.name]
  }
  return router
}
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      // 是否获取到了用户信息
      const name = store.getters.name
      const hasRoles = store.getters.permission_routes && store.getters.permission_routes.length > 0
      console.log(hasRoles)
      if (hasRoles&&name) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch("user/get_user_info");
          await store.dispatch('permission/generateRoutes',  store.getters.routerTable)
          // console.log(convertRouter(store.getters.routerTable));
          console.log(convertRouter(store.getters.routerTable));
          // 可以在这里生成需要权限的路由表
          // router.addRoutes(store.getters.permission_routes);
          router.addRoutes(convertRouter(store.getters.routerTable));
          // router.addRoutes(store.getters.routerTable)
          next({ ...to, replace: true })

          // next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
