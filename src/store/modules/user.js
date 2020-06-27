import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { GET_LOGIN, GET_USER_INFO } from '@/store/mutations_types'
const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
    name: '',
    avatar: '',
    router: [],
    role_id: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state, rootState) => {
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
  },
  SET_ROUTER: (state, roles) => {
    state.router = roles
  },
  SET_ROLE_ID: (state, id) => {
    state.role_id = id
  }
}

const actions = {
  // 登录
  async [GET_LOGIN]({ commit }, params) {
    const { token, data } = await login(params)
    setToken(token)
    commit('SET_TOKEN', token)

    if (data.role_id) {
      commit('SET_ROLE_ID', data.role_id)
    }
  },

  async [GET_USER_INFO]({ commit }) {
    const { data, role } = await getUserInfo()
    commit('SET_NAME', data.username)
    commit('SET_AVATAR', data.avatar)
    if (role) {
      commit('SET_ROUTER', role.menus)
    }
  },

  // user logout
  async logout({ commit, state, rootState }) {
    await logout()
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE', rootState)
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
