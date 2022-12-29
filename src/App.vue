<template>
	<Navbar @showModal="showModal = true" />
	<main class="container">
		<div v-if="todos.length">
			<TodoItem
				:todo="todo"
				class="mb-3"
				v-for="todo in todos"
				:key="todo.id"
				@update="updateStatus"
				@delete="deleteTodo"
			/>
		</div>
		<div class="h3 text-center" v-else>
			Задач еще нет
		</div>
	</main>
	<Modal v-if="showModal" @close="showModal = false">
		<NewTodo @add="addTodo" />
	</Modal>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useTodosStore } from '@/stores/todos'
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'
import NewTodo from '@/components/NewTodo.vue'
import TodoItem from '@/components/TodoItem.vue'

export default {
	components: {
		Navbar,
		Modal,
		NewTodo,
		TodoItem,
	},
	data() {
		return {
			showModal: false,
		}
	},
	methods: {
		...mapActions(useTodosStore, {addToStore: 'add', editInStore: 'editStatus', deleteFromStore: 'delete'}),
		addTodo(task) {
			this.addToStore(task)
			this.showModal = false
		},
		updateStatus({id, status}) {
			this.editInStore(id, status)
		},
		deleteTodo(id) {
			const isDelete = confirm('Уверены что хотите удалить?')
			if (isDelete) {
				this.deleteFromStore(id)
			}
		},
	},
	computed: {
		...mapState(useTodosStore, {todos: 'tasks'})
	}
}
</script>
