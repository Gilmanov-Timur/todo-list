<template>
	<header>
		<nav class="navbar navbar-light bg-light mb-4 px-4">
			<a class="navbar-brand h1 mb-0">Todo list</a>
			<form class="form-inline">
				<button class="btn btn-primary my-2 my-sm-0" type="button" @click="$emit('showModal')">
					Добавить задачу
				</button>
			</form>
		</nav>
	</header>
</template>

<script>
export default {
	emits: ['showModal']
}
</script>
