import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{
      age:0,
      gender:''
    },
    detector: false,
    astra: false
  },
  mutations: {
    UPDATE_USER(state,payload){
      state.user.age = payload.age
      state.user.gender = payload.gender
    },
    UPDATE_ASTRA(state,payload){
      state.astra = payload.astra
    }
  },
  actions: {
  },
  modules: {
  }
})
