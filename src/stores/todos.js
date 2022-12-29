import {defineStore} from 'pinia'

const saveTodos = todos => localStorage.setItem('todos', JSON.stringify(todos))

export const useTodosStore = defineStore('todos', {
	state() {
		return {
			todos: JSON.parse(localStorage.getItem('todos')) || [],
		}
	},
	getters: {
		tasks(state) {
			return state.todos.map(todo => {
				return {
					...todo,
					expired: todo.deadline < new Date(new Date().toDateString()),
				}
			})
		},
	},
	actions: {
		add(todo) {
			this.todos.unshift({
				...todo,
				id: Date.now(),
				status: 'new',
			})
			saveTodos(this.todos)
		},
		editStatus(id, status) {
			const index = this.todos.findIndex(todo => todo.id === id)
			this.todos[index].status = status
			saveTodos(this.todos)
		},

		delete(id) {
			const index = this.todos.findIndex(todo => todo.id === id)
			this.todos.splice(index, 1)
			saveTodos(this.todos)
		}
	},
})
