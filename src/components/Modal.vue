<template>
	<Teleport to="body">
		<div class="modal fade show d-block" tabindex="-1">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content p-3">
					<slot />
					<button type="button" class="btn close" @click="$emit('close')">
						&times;
					</button>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade show"></div>
	</Teleport>
</template>

<script>
export default {
	emits: ['close']
}
</script>

<style lang="scss" scoped>
.close {
	position: absolute;
	right: 0;
	top: 0;
	padding: 0 0.5rem;
	font-size: 2rem;
	line-height: normal;
}
</style>