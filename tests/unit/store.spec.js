import Vuex from 'vuex'
import Vue from 'vue'
import store from '../../src/store'

Vue.use(Vuex)
const st = new Vuex.Store(store)

describe('Store', () => {
  it('Debe agregarse un Todo al store y retonar un nuevo estado', () => {
    const todo = { uid: 1, text: 'Tarea 1', done: false }
    st.state.todos = []
    st.state.todos.push(todo)
    
    expect(st.state.todos).toEqual([todo])
  })
})

