<template>
	<a-space direction="vertical" align="center">
		<span>
			<a-linechart-icon class="logo" />
		</span>
		<a-typography-title bold="true">EXTREMELY</a-typography-title>
	</a-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LineChartOutlined } from '@ant-design/icons-vue';

export default defineComponent({
	name: 'TheLogo',
	components: {
		'a-linechart-icon': LineChartOutlined,
	},
});
</script>

<style lang="scss" scoped>
.logo {
	font-size: 300px;
}
</style>
