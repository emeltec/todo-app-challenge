import { mount } from '@vue/test-utils'
import Todo from '@/views/components/Todo'

function getTodoPropsData () {
  return {
    propsData: {
      todo: {
        uid: 1,
        text: 'Cocinar cena',
        done: false
      }
    }
  }
}

let wrapper = mount(Todo, getTodoPropsData())

describe('Todo.vue', () => {
  beforeEach(() => {
    wrapper = mount(Todo, getTodoPropsData())
  })

  it('Debe poder instanciarse el componente', () => {
    // const wrapper = mount(Todo, getTodoPropsData())
    expect(wrapper.vm).toBeTruthy()
  })

  it('Debe renderizar el Todo en html', () => {
    const todoText = 'Cocinar cena'
    expect(wrapper.html()).toContain(todoText)
  })

  it('Debe llamar a la function removeTodo', () => {
    const removeTodoSpy = jest.spyOn(wrapper.vm, 'removeTodo')
    wrapper.find('v-btn').trigger('click')

    expect(removeTodoSpy).toHaveBeenCalled()
  })

  it('Debe llamar a la function toggleTodo', () => {
    const toggleTodoSpy = jest.spyOn(wrapper.vm, 'toggleTodo')
    wrapper.find('v-checkbox').trigger('change')

    expect(toggleTodoSpy).toHaveBeenCalled()
  })

  it('Debe llamar a la function cancelEdit', async () => {
    await wrapper.setData({ editing: true })
    const cancelEditSpy = jest.spyOn(wrapper.vm, 'cancelEdit')
    wrapper.find('v-text-field').trigger('keyup.esc')

    expect(cancelEditSpy).toHaveBeenCalled()
  })

  it('Debe llamar a la function doneEdit', async () => {
    await wrapper.setData({ editing: true })
    const doneEditSpy = jest.spyOn(wrapper.vm, 'doneEdit')
    wrapper.find('v-text-field').trigger('keyup.enter')

    expect(doneEditSpy).toHaveBeenCalled()
  })
})
