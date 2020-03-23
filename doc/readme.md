### 1. 封装 axios
### 2. 多环境

```json
"scripts": {
    "dev": "vue-cli-service serve", // 开发环境
    "build:prod": "vue-cli-service build", // 生成环境
    "build:stage": "vue-cli-service build --mode staging", // 预投产
    "preview": "node build/index.js --preview", // 打包分析
    "lint": "eslint --ext .js,.vue src",
    "test:unit": "jest --clearCache && vue-cli-service test:unit",
    "test:ci": "npm run lint && npm run test:unit",
    "svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml"
  }
```
### 3.router-view
请求不同路径，相同 url 不会触发 vue 的 created 或者 mounted 钩子处理办法：
1. 通过watch $route的变化来做处理
2. 在 router-view 加唯一的 key 
```vue
<router-view :key="key"></router-view>

computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): 					this.$route + +new Date()
    }
 }
```

### 4. 权限验证

**要求：不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成**

#### 4.1 登录逻辑

+ 登录
  + 验证通过后拿到服务端返回的 token 存到 cookie （防止页面刷新丢失）
  + 根据 token 再去拉取一个 **user_info** 的接口来获取用户的详细信息
+ 权限验证
  + 通过 token 获取用户对应的 **role**，动态根据用户的 role 算出其对应有权限的路由，通过 **router.addRoutes** 动态挂载这些路由。
  + 关于 token
    + 设置成会话 token 即页面关闭失效

#### 4.1 获取用户信息

+ 登录成功后， 在全局钩子`router.beforeEach`中拦截路由，判断是否已获得 token，在获得token 之后我们就要去获取用户的基本信息了

  ```js
  router.beforeEach(async(to, from, next) => {
    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        const hasGetUserInfo = store.getters.name
        if (hasGetUserInfo) {
          next()
        } else {
          try {
            // get user info
             await store.dispatch('user/getUserInfo')
            next()
          }
        }
      }
    } 
  })
  ```

+ 获取用户信息成功后根据用户权限进行渲染

### 5. 国际化

使用插件[i18n](https://kazupon.github.io/vue-i18n/zh/)

封装语言文字包库：

```js
$ src/lang
├── lang
│   ├── en.js
│   ├── index.js
│   └── zh.js
```

文件入口：

```js

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

// 如果在一个模块系统中使用它，你必须通过 Vue.use() 明确地安装 vue-i18n：
Vue.use(VueI18n)

// 语言环境信息
// zhLocale ==> {Chinese:'中文'}
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
}
export function getLanguage() {
  // 存到 cookie  方便下次进入不用切换语言
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language 
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(), 
  // set locale messages
  messages
})

export default i18n
```

然后在 main.js 引入，挂载到 Vue 实例上就可以使用了。 

切换语言：

```js
handleSetLanguage(lang) {
  // 全局配置 语言
  this.$i18n.locale = lang
  this.$store.dispatch('app/setLanguage', lang)
  this.$message({
    message: lang==='en'?'Switch Language Success':'切换语言成功',
    type: 'success'
  })
}
```





