<template>
	<a-modal :visible="visible" :title="$t('Results')">
		<a-table ></a-table>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExcelReport from '@/types/excelReport.type';

export default defineComponent({
	name: 'ResultsModal',
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		report: {} as ExcelReport,
	}),
	methods: {
		show(visible: any): void {
			this.$emit('show', visible.target.value);
		},
		export(report: ExcelReport): void {
			this.$emit('export', report);
		},
	},
});
</script>
