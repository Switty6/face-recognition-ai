import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{
      age:0,
      gender:''
    }
  },
  mutations: {
    UPDATE_USER(state,payload){
      state.user.age = payload.age
      state.user.gender = payload.gender
    }
  },
  actions: {
  },
  modules: {
  }
})
