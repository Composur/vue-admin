import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

/**
 * @description require.context是一个webpack提供的Api,通过执行require.context函数获取一个特定的上下文,主要是用于实现自动化导入模块
 * @param 第一个参数，要扫描的目录
 * @param 第二个参数，是否扫描所有的子级文件夹
 * @param 第三个参数，要扫描的文件，用正则进行匹配
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
