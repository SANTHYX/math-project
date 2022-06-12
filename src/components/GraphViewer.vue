<template>
	<div>
		<line-chart
			id="users-chart"
			width="100vw"
			height="500px"
			:data="inputPoints"
		></line-chart>
	</div>
</template>

<script lang="ts">
import EditablePoint from '@/types/editablePoint.type';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'GraphViewer',
	props: {
		inputPoints: {
			type: Object as PropType<number[][]>,
			required: true,
		},
	},
});
</script>
