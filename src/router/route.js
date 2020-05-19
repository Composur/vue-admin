import Layout from "@/layout";
// 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
// name:设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
// meta.onCache  // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
// breadcrumb 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
// affix 若果设置为true，它则会固定在tags-view中(默认 false)

//  activeMenu: '/article/list' 当路由设置了该属性，则会高亮相对应的侧边栏。
// 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
// 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置

// {
//   path: '/permission',
//   component: Layout,
//   redirect: '/permission/index', //重定向地址，在面包屑中点击会重定向去的地址
//   hidden: true, // 不在侧边栏线上
//   alwaysShow: true, //一直显示根路由
//   meta: { roles: ['admin','editor'] }, //你可以在根路由设置权限，这样它下面所以的子路由都继承了这个权限
//   children: [{
//     path: 'index',
//     component: ()=>import('permission/index'),
//     name: 'permission',
//     meta: {
//       title: 'permission',
//       icon: 'lock', //图标
//       roles: ['admin','editor'], //或者你可以给每一个子路由设置自己的权限
//       noCache: true // 不会被 <keep-alive> 缓存
//     }
//   }]
// }

// 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
export const constantRoutes = [
  {
    path: '/redirect', // 为了在不改变URL，刷新当前页
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)', // 重定向到 redirect 组件
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    // meta: { title: "Dashboard", icon: "dashboard" }, // 设置该路由进入的权限，支持多个权限叠加
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "主面板", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/userInfo",
    meta: { title: "用户管理", icon: "user-settings" },
    children: [
      {
        path: "/user/userInfo",
        name: "userManage",
        component: () => import("@/views/user/userInfo"),
        meta: {
          title: "用户管理",
          icon: "user-settings"
        }
      },
      {
        path: "userRole",
        name: "userRole",
        component: () => import("@/views/user/userRole"),
        meta: {
          title: "角色管理",
          icon: "user-settings"
        }
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    meta: { title: "表单", icon: "form" },
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "表单", icon: "form" }
      },
      {
        path: "treeTable",
        name: "treeTable",
        component: () => import("@/views/form/treeTable"),
        meta: { title: "树形表格", icon: "tree" }
      },
      {
        path: "treeMenu",
        name: "treeMenu",
        component: () => import("@/views/form/treeMenu"),
        meta: { title: "树形菜单", icon: "tree" }
      }
    ]
  },

  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "嵌套",
      icon: "nested"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" }
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" }
              }
            ]
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" }
          }
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "menu2" }
      }
    ]
  },

  {
    path: "/github",
    component: Layout,
    meta: { title: "github", icon: "link" },
    children: [
      {
        path: "https://github.com/Composur",
        meta: { title: "github", icon: "link" }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

// 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面
export const asyncRoutes = []