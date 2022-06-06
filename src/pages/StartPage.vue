<template>
	<a-layout class="startPage">
		<a-row type="flex" justify="center" align="center">
			<logo />
		</a-row>
		<a-row type="flex" justify="center" align="center">
			<a-space direction="vertical" align="center" size="large">
				<a-button
					type="primary"
					shape="round"
					size="large"
					class="btn"
					@click="$router.push('/calculator')"
				>
					<a-calculator-icon />&nbsp;{{ $t('Calculate') }}
				</a-button>
				<a-button
					type="primary"
					shape="round"
					size="large"
					class="btn"
					@click="$router.push('/instruction')"
				>
					<a-info-icon />&nbsp;{{ $t('Instruction') }}
				</a-button>
				<a-button
					type="primary"
					shape="round"
					size="large"
					class="btn"
					@click="interpolation"
				>
					Interpolate
				</a-button>
			</a-space>
		</a-row>
	</a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CalculatorOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import Logo from '../components/TheLogo.vue';
import interpolationService from '@/services/interpolation.service';
import Point from '@/types/point.type';

export default defineComponent({
	name: 'StartPage',
	components: {
		'a-calculator-icon': CalculatorOutlined,
		'a-info-icon': InfoCircleOutlined,
		Logo,
	},
	methods: {
		interpolation() {
			const xd: Point[] = [
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 4, y: 11 },
				{ x: 5.5, y: 11.4 },
				{ x: 6.1, y: 12 },
			];
			const result = interpolationService.findInterpolatingFunction(6.7, xd);
			console.log(result);
		},
	},
});
</script>

<style lang="scss">
.startPage {
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;

	.btn {
		width: 30vw;
		min-width: 300px;
	}
}
</style>
