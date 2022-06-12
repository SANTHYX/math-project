<template>
	<a-layout>
		<a-layout-content class="view">
			<a-page-header class="header">
				<a-button
					type="primary"
					class="back-button"
					shape="round"
					@click="$router.push('/')"
				>
					<a-left-arrow-icon />&nbsp;{{ $t('Back') }}
				</a-button>
				<a-space direction="horizontal" size="large">
					<a-button
						v-for="route in subPages"
						:key="route.key"
						type="primary"
						shape="round"
						@click="changeCalculationType(route.label)"
					>
						<component :is="route.iconComponent" />&nbsp;{{ $t(route.label) }}
					</a-button>
				</a-space>
			</a-page-header>
			<a-space v-if="showGraph">
				<graph-viewer :inputPoints="getChartPoints" />
			</a-space>
		</a-layout-content>
		<a-card class="card-container">
			<a-tabs
				v-model:activeKey="activeKey"
				:defaultActiveKey="activeKey"
				type="card"
			>
				<a-tab-pane key="1">
					<template #tab>
						<a-plus-icon />
						{{ $t('Add Points') }}
					</template>
					<div class="tab-content">
						<a-row type="flex">
							<a-col :span="10" offset="1">
								<a-divider>
									<one-to-one-icon />&nbsp;{{ $t('Pass Points') }}
								</a-divider>
								<point-adder @insert="insertToArray" />
								<a-button
									type="primary"
									size="large"
									shape="round"
									block="100%"
									style="margin-top: 8rem"
									@click="handleOperation"
								>
									{{ $t(getOperation) }}
								</a-button>
							</a-col>
							<a-col :span="10" offset="1">
								<a-divider>
									<border-bottom-icon />&nbsp;{{ $t('Overview') }}
								</a-divider>
								<point-editor
									:points="inputPoints"
									@editPoint="handleEditPoint"
								/>
							</a-col>
						</a-row>
					</div>
				</a-tab-pane>
			</a-tabs>
		</a-card>
	</a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
	DotChartOutlined,
	AreaChartOutlined,
	LeftSquareOutlined,
	PlusCircleOutlined,
	LineChartOutlined,
	FileExcelOutlined,
	OneToOneOutlined,
	BorderBottomOutlined,
} from '@ant-design/icons-vue';
import Route from '@/types/route.type';
import PointAdder from '@/components/PointAdder.vue';
import Point from '@/types/point.type';
import ChartIcon from '@/components/ChartIcon.vue';
import FileIcon from '@/components/FileIcon.vue';
import CalculationOperationType from '@/types/enum/calculationOperationType.enum';
import PointsEditor from '../components/PointsEditor.vue';
import EditablePoint from '@/types/editablePoint.type';
import interpolationService from '@/services/interpolation.service';
import aproximationService from '@/services/aproximation.service';
import GraphViewer from '@/components/GraphViewer.vue';

export default defineComponent({
	name: 'CalculatorPage',
	components: {
		'a-dot-chart-icon': DotChartOutlined,
		'a-area-chart-icon': AreaChartOutlined,
		'a-left-arrow-icon': LeftSquareOutlined,
		'a-plus-icon': PlusCircleOutlined,
		'a-line-chart-icon': LineChartOutlined,
		'a-excel-icon': FileExcelOutlined,
		'one-to-one-icon': OneToOneOutlined,
		'border-bottom-icon': BorderBottomOutlined,
		'point-adder': PointAdder,
		'a-chart-icon': ChartIcon,
		'a-file-icon': FileIcon,
		'point-editor': PointsEditor,
		GraphViewer,
	},
	computed: {
		getOperation() {
			return this.calculationType === CalculationOperationType.INTERPOLATION
				? 'Interpolate'
				: 'Aproximate';
		},
		getChartPoints() {
			return this.inputPoints.map((points) => [points.point.x, points.point.y]);
		},
		disabledButtonRule() {
			return (
				this.inputPoints.length <= 2 ||
				!this.inputPoints.some(
					(editablePoint) => editablePoint.point.y === null
				) ||
				this.inputPoints
			);
		},
	},
	data: () => ({
		activeKey: 1 as number,
		result: 0 as number,
		calculationType: CalculationOperationType.INTERPOLATION,
		inputPoints: [] as EditablePoint[],
		outputPoints: [] as Point[],
		subPages: [
			{
				key: 'aproximation',
				label: 'Aproximation',
				iconComponent: 'a-dot-chart-icon',
			},
			{
				key: 'interpolation',
				label: 'Interpolation',
				iconComponent: 'a-area-chart-icon',
			},
		] as Route[],
		showGraph: false,
	}),
	methods: {
		handleOperation() {
			switch (this.calculationType) {
				case CalculationOperationType.INTERPOLATION:
					this.interpolate();
					break;
				default:
					this.aproximate();
					break;
			}
		},
		interpolate(): void {
			this.inputPoints
				.sort((a, b) => a.point.x - b.point.x)
				.forEach((_) => {
					const localData = [...this.inputPoints.map((x) => x.point)];
					const firstEmptyIndex = localData.findIndex(
						(point) => point.y === null
					);
					const rangeBeforeNullValues = localData.splice(0, firstEmptyIndex);

					const y = interpolationService
						.interpolatePolynominal(
							this.inputPoints[firstEmptyIndex].point.x,
							rangeBeforeNullValues
						)
						.toPrecision(2);

					this.inputPoints[firstEmptyIndex].point.y = Number.parseFloat(y);
					this.showGraph = true;
				});
		},
		aproximate(): void {
			const points = this.inputPoints.map(
				(editablePoint) => editablePoint.point
			);
			this.outputPoints = aproximationService.aproximatePolinomoinal(points);

			console.log(this.outputPoints);
		},
		insertToArray(point: EditablePoint): void {
			this.inputPoints.push(point as EditablePoint);
		},
		handleEditPoint(editedPoint: EditablePoint) {
			const point = this.inputPoints.find(
				(point) => point.key === editedPoint.key
			);
			point.point = editedPoint.point;
		},
		changeCalculationType(label: string): void {
			this.clearState();
			this.calculationType = Object.values(CalculationOperationType).find(
				(type) => type === label.toUpperCase()
			);
		},
		clearState(): void {
			this.result = 0;
			this.inputPoints = [];
			this.outputPoints = [];
		},
	},
});
</script>

<style lang="scss" scoped>
.view {
	width: 100vw;
	height: 70vh;

	.header {
		background: black;
		display: flex;
		justify-content: center;
		width: 100vw;
	}

	.back-button {
		position: absolute;
		top: 28px;
		left: 20px;
	}
	.escape-icon {
		font-size: 20px;
		color: black;
		margin: 1rem;
		cursor: pointer;
	}

	.tab-content {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		#chart-icon {
			font-size: 15px;
		}
	}
}
</style>
