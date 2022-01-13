const state = {
  user: {}
}

const mutations = {
  SET_USER (state, user) {
    let _user = {}

    // 操作状态机
    _user = user
    state.user = {
      ...state.user,
      ..._user
    }
  }
}

const actions = {
  updateUser ({commit}, user) {
    commit('SET_USER', user)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
