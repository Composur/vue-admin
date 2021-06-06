// 并发测试
<template>
  <div>drag</div>
</template>
<script>
import { promiseQueueGet } from '@/utils/promise.queue'
export default {
  data() {
    return {
      count: 1000
    }
  },
  created() {
    // this.test()
    this.test1()
  },
  methods: {
    test() {
      const t = promiseQueueGet('test')
      for (let i = 0; i < 10; i++) {
        console.log(typeof this.asyncFun, t)
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
          // console.log('test1', this.count)
        }, 1500)
      })
    }
  }
}
</script>
