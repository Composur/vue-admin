import { login, logout,getUserInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { GET_LOGIN, GET_USER_INFO } from "@/store/mutations_types";
const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
    name: "",
    avatar: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // 登录
  async [GET_LOGIN]({ commit }, params) {
    const res = await login(params);
    setToken(res.token);
    commit("SET_TOKEN", res.token);
  },

  async [GET_USER_INFO]({ commit }) {
    const { data } = await getUserInfo();
    commit("SET_NAME", data.username);
    commit("SET_AVATAR", data.avatar);
  },

  // user logout
  async logout({ commit, state }) {
    await logout();
    removeToken(); // must remove  token  first
    resetRouter();
    commit("RESET_STATE");
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
