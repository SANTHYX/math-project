<template>
	<a-card>
		<a-table
			:dataSource="getFlatCollection"
			:columns="columns"
			style="overflow-y: auto"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'edit'">
					<a-button @click="selectPoint(record)">{{ $t('Edit') }}</a-button>
				</template>
			</template>
		</a-table>
		<a-divider orientation="center">
			{{ $t('Edit Point') }}
		</a-divider>
		<a-form layout="vertical">
			<a-form-item :label="$t('Change Point X')">
				<a-input-number
					v-model:value="selectedPoint.point.x"
					style="width: 100%"
					:step="0.01"
					:min="0"
				/>
			</a-form-item>
			<a-form-item :label="$t('Change Point Y')">
				<a-input-number
					v-model:value="selectedPoint.point.y"
					style="width: 100%"
					:step="0.01"
					:min="0"
				/>
			</a-form-item>
			<a-button type="danger" block="true" shape="round" @click="editPoint">
				<a-edit-icon />&nbsp;{{ $t('Edit') }}
			</a-button>
		</a-form>
	</a-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EditOutlined } from '@ant-design/icons-vue';
import EditablePoint from '@/types/editablePoint.type';

export default defineComponent({
	name: 'PointsViewer',
	components: {
		'a-edit-icon': EditOutlined,
	},
	props: {
		points: {
			type: Object as PropType<EditablePoint[]>,
			default: [] as EditablePoint[],
		},
	},
	computed: {
		getFlatCollection() {
			return this.points.map((point) => {
				return {
					key: point.key,
					x: point.point.x,
					y: point.point.y,
				};
			});
		},
	},
	data: () => ({
		columns: [
			{
				title: 'X',
				dataIndex: 'x',
				key: 'x',
				align: 'center',
			},
			{
				title: 'Y',
				dataIndex: 'y',
				key: 'y',
				align: 'center',
			},
			{
				title: 'Edytuj',
				key: 'edit',
				align: 'center',
			},
		],
		selectedPoint: {
			key: undefined,
			point: {
				x: 0,
				y: 0,
			},
		} as EditablePoint,
	}),
	methods: {
		selectPoint(record: any): void {
			this.selectedPoint = {
				key: record.key,
				point: {
					x: record.x,
					y: record.y,
				},
			} as EditablePoint;
		},
		editPoint(): void {
			this.$emit('editPoint', this.selectedPoint);
		},
		removePoint(point: EditablePoint): void {
			this.$emit('removePoint', point);
		},
		clearPoints() {
			this.$emit('clear');
		},
	},
});
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	.input {
		width: 120%;
	}
}
</style>
