<template>
	<a-card>
		<a-input
			type="text"
			v-model="localExpression.top"
			:addonBefore="$t('counter')"
		/>
		<a-input
			type="text"
			v-model="localExpression.bottom"
			:addonBefore="$t('divider')"
		/>
	</a-card>
</template>

<script lang="ts">
import Expression from '@/types/expression.type';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'ExpressionEditor',
	props: {
		expression: {
			type: Object as PropType<Expression>,
		},
	},
	data: () => ({
		localExpression: {
			top: '',
			bottom: '',
		} as Expression,
	}),
	methods: {
		insert(): void {
			this.$emit('insert');
		},
		edit(): void {
			this.$emit('edit');
		},
	},
});
</script>
