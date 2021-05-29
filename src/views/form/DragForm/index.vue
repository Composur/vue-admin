<template>
  <div>drag<Test /></div>
</template>
<script>
import Test from './test'
import { promiseQueueGet } from '@/utils/promise.queue'
export default {
  components: { Test },
  data() {
    return {
      count: 0
    }
  },
  created() {
    this.test()
    // this.test1()
  },
  methods: {
    test() {
      const t = promiseQueueGet('test')
      for (let i = 0; i < 10; i++) {
        // console.log(typeof this.asyncFun, t)
        t.join(this.asyncFun)
        // this.asyncFun()
      }
    },
    test1() {
      const t = promiseQueueGet('test1')
      for (let i = 0; i < 10; i++) {
        // console.log(typeof this.asyncFun, t)
        t.join(this.asyncFun)
        // this.asyncFun()
      }
    },
    async asyncFun() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve((this.count += 100))
          console.log('test', this.count)
        }, 1500)
      })
    }
  }
}
</script>
