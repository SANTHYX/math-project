<template>
	<div>
		<BarChartOutlined class="chart" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BarChartOutlined } from '@ant-design/icons-vue';

export default defineComponent({
	name: 'ChartIcon',
	components: {
		BarChartOutlined,
	},
});
</script>

<style lang="scss" scoped>
.chart {
	font-size: 200px;
}
</style>
