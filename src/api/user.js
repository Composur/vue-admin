import request from '@/utils/request'
export const login = data => request('/login', 'POST', data)
export const getUserInfo = data => request('/getUserInfo', 'GET')
export const getUsers = data => request('/manage/user/list')
export const addUser = data => request('/manage/user/add', 'POST', data)
export const deleteUser = data => request('/manage/user/delete', 'POST', data)
export const roleAdd = data => request('/manage/role/add', 'POST', data)
export const getRoleLists = data => request('/manage/role/list', 'GET', data)
export const addAuthLists = data => request('/manage/role/update', 'POST', data)
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
  return new Promise(resolve => {
    resolve()
  })
}
