import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{
      age:0,
      gender:'',
      mood:'',
    },
    detector: false,
    astra: false
  },
  mutations: {
    UPDATE_USER(state,payload){
      state.user.age = payload.age
      state.user.gender = payload.gender
      state.user.mood = payload.mood
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
