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
			</a-space>
		</a-row>
	</a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CalculatorOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import Logo from '../components/TheLogo.vue';

export default defineComponent({
	name: 'StartPage',
	components: {
		'a-calculator-icon': CalculatorOutlined,
		Logo,
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
