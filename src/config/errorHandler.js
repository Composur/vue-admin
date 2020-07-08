export default function(err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 上报错误信息

  // 环境变量上报

  // const version = ''
  const userInfo = process.env.version

  const errorJson = {
    url: '',
    query: {
      type: '',
      url: window.location.href,
      msg: JSON.stringify({
        msg: info || err.message || (err.reason || {}).message,
        userInfo,
        stack: JSON.stringify(err.message || (err.reason || {}).reason)
      })
    }
  }
  // 分情况上报
  if (process.env.NODE_ENV === 'development') {
    console.log('上报错误信息', errorJson)
    console.error(err, info)
  } else {
    // 上报到服务器 发 HTTP 请求
  }
}
