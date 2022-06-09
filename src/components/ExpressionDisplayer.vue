<template>
	<a-card></a-card>
</template>

<script lang="ts">
import Expression from '@/types/expression.type';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'ExpressionDispalyer',
	props: {
		expression: {
			type: Object as PropType<Expression>,
			required: true,
		},
	},
});
</script>
