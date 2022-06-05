<template>
	<div>
		<a-layout-content class="view">
			<span class="escape-icon">
				<a-arrow-left-icon />&nbsp;{{ $t('Back') }}
			</span>
			<a-space>
				<expression-displayer
					v-for="expression in expressions"
					:key="expression.id"
					:expression="expression"
				/>
			</a-space>
		</a-layout-content>
		<a-card title="Menu"> </a-card>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LeftSquareFilled } from '@ant-design/icons-vue';
import ExpressionDisplayer from '@/components/ExpressionDisplayer.vue';
import Expression from '@/types/expression.type';
import AproximationService from '@/services/aproximation.service';

export default defineComponent({
	name: 'CalculatorPage',
	components: {
		'a-arrow-left-icon': LeftSquareFilled,
		'expression-displayer': ExpressionDisplayer,
	},
	computed: {},
	data: () => ({
		expressions: [
			{
				id: 1,
				top: '2x-2y',
				bottom: 'x2+5y+24xy',
			},
		] as Expression[],
		result: 0 as number,
	}),
	methods: {
		//interpolate(): void {},
		//aproximate(): void {},
		//generateGraph(): void {},
	},
});
</script>

<style lang="scss" scoped>
.view {
	width: 100vw;
	height: 65vh;

	.escape-icon {
		font-size: 20px;
		color: black;
		margin: 1rem;
	}
}
</style>
