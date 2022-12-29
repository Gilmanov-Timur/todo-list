<template>
	<div class="card">
		<div class="card-header px-2 px-sm-3">
			<div class="row">
				<div class="col h5 my-0">
					{{ todo.title }}
				</div>
				<div class="col-auto">
					<span
						class="badge"
						:class="`badge-${statuses.expired.type}`"
						v-if="todo.status === 'new' && todo.expired"
					>
						{{ statuses.expired.text }}
					</span>
					<span
						class="badge"
						:class="`badge-${statuses[todo.status].type}`"
						v-else
					>
						{{ statuses[todo.status].text }}
					</span>
				</div>
			</div>
		</div>
		<div class="card-body px-2 px-sm-3">
			Дэдлайн:
			<span class="font-weight-bold">
				{{ new Date(todo.deadline).toLocaleDateString() }}
			</span>
			<span class="text-danger" v-if="todo.expired">
				срок истек
			</span>
		</div>
		<div class="card-footer px-2 px-sm-3">
			<div class="mx-n1">
				<template v-if="!todo.expired">
					<button
						type="button"
						class="btn btn-success btn-sm mx-1"
						@click="$emit('update', {id: todo.id, status: 'done'})"
					>
						Выполнить
					</button>
					<button
						type="button"
						class="btn btn-warning btn-sm mx-1"
						@click="$emit('update', {id: todo.id, status: 'failed'})"
					>
						Провалить
					</button>
				</template>
				<button
					type="button"
					class="btn btn-danger btn-sm mx-1"
					@click="$emit('delete', todo.id)"
				>
					Удалить
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		todo: Object,
	},
	emits: ['update', 'delete'],
	data() {
		return {
			statuses: {
				new: {
					type: 'primary',
					text: 'Новая',
				},
				done: {
					type: 'success',
					text: 'Выполнена',
				},
				failed: {
					type: 'warning',
					text: 'Провалена',
				},
				expired: {
					type: 'secondary',
					text: 'Просрочена',
				},
			}
		}
	}
}
</script>
