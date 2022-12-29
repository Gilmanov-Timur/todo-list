<template>
	<h3 class="mt-0 mb-3 pb-2 border-bottom">
		Новая задача
	</h3>
	<form @submit.prevent="onSubmit">
		<div class="form-group mb-3">
			<label for="title">Название</label>
			<input
				type="text"
				v-model.trim="form.title"
				class="form-control"
				:class="{'is-invalid': errors.title}"
				id="title"
			/>
			<div class="invalid-feedback" v-if="errors.title">
				{{ errors.title }}
			</div>
		</div>
		<div class="form-group mb-3">
			<label for="deadline">Дэдлайн</label>
			<input
				type="date"
				v-model="form.deadline"
				class="form-control"
				:class="{'is-invalid': errors.deadline}"
				id="deadline"
			>
			<div class="invalid-feedback" v-if="errors.deadline">
				{{ errors.deadline }}
			</div>
		</div>
		<button class="btn btn-primary">
			Создать
		</button>
	</form>
</template>

<script>
export default {
	emits: ['add'],
	data() {
		return {
			form: {
				title: '',
				deadline: '',
			},
			errors: {
				title: null,
				deadline: null,
			},
			submitted: false,
		}
	},
	methods: {
		onSubmit() {
			this.submitted = true
			if (this.validateForm()) {
				this.$emit('add', {
					title: this.form.title,
					deadline: new Date(this.form.deadline).getTime()
				})
			}
		},
		validateForm() {
			let isValid = true

			if (!this.form.title) {
				this.errors.title = 'Введите название задачи'
				isValid = false
			} else if (this.form.title.length < 3) {
				this.errors.title = 'Длина поля не менее 3 символов'
				isValid = false
			} else {
				this.errors.title = null
			}

			if (!this.form.deadline) {
				this.errors.deadline = 'Укажите дату дэдлайна'
				isValid = false
			} else if (new Date(new Date(this.form.deadline).toDateString()) < new Date(new Date().toDateString())) {
				this.errors.deadline = 'Дата не может быть прошедшей'
				isValid = false
			} else {
				this.errors.deadline = null
			}

			return isValid
		},
	},
	watch: {
		form: {
			handler() {
				if (this.submitted) {
					this.validateForm()
				}
			},
			deep: true
		},
	},
}
</script>