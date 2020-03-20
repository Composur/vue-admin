import { login, logout, getInfo,getUserInfo } from '@/api/user'
import Store from 'store'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import {GET_LOGIN,GET_USER_INFO} from '@/store/mutations_types'
const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo:{},
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  [GET_LOGIN]: (state,data) => {
    state.token = data
  },
  [GET_USER_INFO]: (state,data) => {
    state.userInfo = data
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
//  async login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },
// 登录
  async [GET_LOGIN]({
    commit
  }, params) {
    const res = await login(params)
    setToken(res.token)
    commit('SET_TOKEN', res.token)
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  
  async [GET_USER_INFO]({commit}){
    const {data} = await getUserInfo()
    commit('SET_NAME',data.username)
  },

  // user logout
 async logout({ commit, state }) {
    await logout()
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
    // return new Promise((resolve, reject) => {
    //   debugger
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

