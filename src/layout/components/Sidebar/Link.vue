
<template>
  <!-- eslint-disable vue/require-component-is -->

  <component :is="link" v-bind="linkProps(to)" @click.native="clickLink(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'NavLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      test: 1,
      link: 'NavLink'
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    },
    clickLink(path) {
      // 点击-不改变URL路径的情况下从新render页面

      // 方法一：生命周期函数不会执行
      // this.$router.push({
      //   path,
      //   query: {
      //     t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
      //   }
      // });
      // 方法二：
      const { fullPath } = this.$route
      this.$router.replace({
        path: '/redirect' + fullPath
      })
    }
  }
}
</script>
