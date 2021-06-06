const namespacePromiseQueue = {}

/**
 * Promise 任务队列
 */
class PromiseQueue {
  /**
   *
   * @param {Sting} namespace 命名空间
   * @param {Number} concurrency 并发数
   */
  constructor(namespace, concurrency) {
    this.namespace = namespace
    this.concurrency = concurrency
    // 任务队列
    this.queue = []
    // 执行状态
    this.paused = false
    // 当前正在执行的数量
    this.runingCount = 0
  }
  /**
   * 等待执行的数量
   * @returns {Number}
   */
  get waitingCount() {
    return this.queue.length
  }
  /**
   *
   * @param {Promise} promiseFunc Promise
   */
  join(promiseFunc) {
    if (typeof promiseFunc !== 'function') {
      throw new Error('promiseFunc 不是函数')
    }
    // 当前请求并发量大于设置的并发量延迟请求
    if (this.runingCount >= this.concurrency) {
      // 等待执行
      this.queue.push(promiseFunc)
      // console.log(this.queue)
      return
    }
    // 执行
    this.execute(promiseFunc)
  }
  async execute(promiseFunc) {
    try {
      this.runingCount += 1
      const result = await promiseFunc()
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      this.runingCount -= 1
      // 执行下一个
      this.next()
    }
  }
  next() {
    if (this.queue.length <= 0) {
      return
    }
    const func = this.queue.shift()
    this.execute(func)
  }
}

/**
 * 命名空间
 */
class PromiseQueueWrap {
  constructor(namespace, concurrency) {
    this.namespace = namespace
    this.concurrency = concurrency
    // 实例化任务队列
    let queue = namespacePromiseQueue[namespace]
    if (!queue) {
      queue = new PromiseQueue(namespace, concurrency)
      namespacePromiseQueue[namespace] = queue
      // return queue
    }
  }
  /**
   * 等待执行的数量
   * @returns {Number} 执行队列长度
   */
  get waitingCount() {
    const queue = namespacePromiseQueue[this.namespace]
    return queue.waitingCount
  }
  /**
   * 执行中的数量
   * @returns {Number} 正在执行的数量
   */
  get runingCount() {
    const queue = namespacePromiseQueue[this.namespace]
    return queue.runingCount
  }
  /**
   * 加入队列
   */
  join(promiseFunc) {
    const queue = namespacePromiseQueue[this.namespace]
    if (queue) {
      queue.join(promiseFunc)
    }
  }
}
const namespacePromiseWrap = {}
export const promiseQueueGet = (namespace, concurrency = 2) => {
  let queue = namespacePromiseWrap[namespace]
  if (!queue) {
    queue = new PromiseQueueWrap(namespace, concurrency)
    namespacePromiseWrap[namespace] = queue
  }
  return queue
}
