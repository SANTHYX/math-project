<template>
	<div>
		<line-chart
			id="users-chart"
			width="90vw"
			height="50vh"
			:data="configInputs"
		></line-chart>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'GraphViewer',
	computed: {
		configInputs() {
			return [
				{ name: 'Wykres Interpolacji', data: this.inputPoints },
				{ name: 'Wykres Aproxymacji', data: this.outputPoints },
			];
		},
	},
	props: {
		inputPoints: {
			type: Object as PropType<number[][]>,
			required: true,
		},
		outputPoints: {
			type: Object as PropType<number[][]>,
			required: true,
		},
	},
});
</script>
