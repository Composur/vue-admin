import request from '@/utils/request'
import Store from 'store'
import { resolve } from 'upath'
export const login = data => request('/login', 'POST', data)
export const getUserInfo = data => request('/getUserInfo')
export const getUsers = data => request('/manage/user/list')
export const addUser = data => request('/manage/user/add','POST',data)
// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
  return new Promise(resolve=>{
    resolve()
  })
}
