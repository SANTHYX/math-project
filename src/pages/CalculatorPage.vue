<template>
	<a-layout>
		<a-layout-content class="view">
			<a-page-header class="header">
				<a-space align="flex-start">
					<a-button type="primary" shape="round" @click="$router.push('/')">
						<a-left-arrow-icon />
						&nbsp;{{ $t('Back') }}
					</a-button>
				</a-space>
			</a-page-header>
			<a-row justify="center" align="center">
				<a-space direction="vertical" align="center">
					<graph-viewer
						:inputPoints="getChartInputPoints"
						:outputPoints="getChartOutputPoints"
					/>
				</a-space>
			</a-row>
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
									style="margin-top: 3rem"
									:disabled="interpolationBolckRule"
									@click="interpolate"
								>
									{{ $t('Interpolate') }}
								</a-button>
								<a-button
									type="primary"
									size="large"
									shape="round"
									block="100%"
									style="margin-top: 1rem"
									:disabled="aproximationBolckRule"
									@click="aproximate"
								>
									{{ $t('Aproximate') }}
								</a-button>
								<a-button
									type="danger"
									size="large"
									shape="round"
									block="100%"
									style="margin-top: 1rem"
									:disabled="polynomialBlockRule"
									@click="showPolynomialFunction"
								>
									{{ $t('Show Polynomial') }}
								</a-button>
								<a-button
									type="danger"
									size="large"
									shape="round"
									block="100%"
									style="margin-top: 1rem"
									:disabled="errorsBlockRule"
									@click="calculateErrors"
								>
									{{ $t('Calculate Errors') }}
								</a-button>
								<a-button
									type="danger"
									size="large"
									shape="round"
									block="100%"
									style="margin-top: 1rem"
									@click="clearState"
								>
									<a-reset-icon />&nbsp;
									{{ $t('Clear State') }}
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
	LeftSquareOutlined,
	PlusCircleOutlined,
	OneToOneOutlined,
	BorderBottomOutlined,
	ClearOutlined,
} from '@ant-design/icons-vue';
import Route from '@/types/route.type';
import PointAdder from '@/components/PointAdder.vue';
import Point from '@/types/point.type';
import MeanStatisticsError from '@/types/error.type';
import CalculationOperationType from '@/types/enum/calculationOperationType.enum';
import PointsEditor from '../components/PointsEditor.vue';
import EditablePoint from '@/types/editablePoint.type';
import interpolationService from '@/services/interpolation.service';
import aproximationService from '@/services/aproximation.service';
import GraphViewer from '@/components/GraphViewer.vue';
import mathUtils from '@/utils/mathUtils.util';

export default defineComponent({
	name: 'CalculatorPage',
	components: {
		'a-left-arrow-icon': LeftSquareOutlined,
		'a-plus-icon': PlusCircleOutlined,
		'one-to-one-icon': OneToOneOutlined,
		'border-bottom-icon': BorderBottomOutlined,
		'point-adder': PointAdder,
		'point-editor': PointsEditor,
		'a-reset-icon': ClearOutlined,
		GraphViewer,
	},
	computed: {
		getOperation() {
			return this.calculationType === CalculationOperationType.INTERPOLATION
				? 'Interpolate'
				: 'Aproximate';
		},
		getChartInputPoints() {
			return this.inputPoints.map((points) => [points.point.x, points.point.y]);
		},
		getChartOutputPoints() {
			return this.aproximatedPoints.map((points) => [points.x, points.y]);
		},
		getInputPoints() {
			return this.inputPoints.map((editable) => editable.point);
		},
		aproximationBolckRule() {
			return (
				this.getInputPoints.some((obj) => !obj.y) ||
				this.getInputPoints.length < 3
			);
		},
		interpolationBolckRule() {
			return (
				this.getInputPoints.every((obj) => obj.y) ||
				this.getInputPoints.length < 3
			);
		},
		errorsBlockRule() {
			return (
				this.getInputPoints.length === 0 || this.aproximatedPoints.length === 0
			);
		},
		polynomialBlockRule() {
			return this.getInputPoints.length === 0;
		},
	},
	data: () => ({
		activeKey: 1 as number,
		result: 0 as number,
		calculationType: CalculationOperationType.INTERPOLATION,
		inputPoints: [] as EditablePoint[],
		aproximatedPoints: [] as Point[],
		polynomialFunctions: [] as string[],
		errors: {
			mse: 0 as number,
			mae: 0 as number,
			maxAe: 0 as number,
		} as MeanStatisticsError,
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
	}),
	methods: {
		interpolate(): void {
			this.inputPoints.forEach((_) => {
				const localData = [...this.getInputPoints];
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
				if (isNaN(Number.parseFloat(y))) {
					this.$toast.error('Niewłaściwa Funkcja!', {
						position: 'top-right',
					});
					throw new Error('Invalid Function');
				}
				const polynomial = interpolationService.getInterpolationPolynomial(
					this.inputPoints[firstEmptyIndex].point.x,
					rangeBeforeNullValues
				);
				this.addPolynomialFunctions(polynomial);
				this.inputPoints[firstEmptyIndex].point.y = Number.parseFloat(y);
				this.$toast.success('Wyliczono Pomyślnie', {
					position: 'top-right',
				});
			});
		},
		aproximate(): void {
			this.aproximatedPoints = aproximationService.aproximatePolinomoinal(
				this.getInputPoints
			);
			this.polynomialFunctions = [];
			this.polynomialFunctions.push(
				aproximationService.findPolinominalAproximationFunction(
					this.getInputPoints
				)
			);
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
		addPolynomialFunctions(polynomial: string): void {
			this.polynomialFunctions.push(polynomial);
		},
		showPolynomialFunction() {
			this.$toast.info(`Wielomian: ${this.polynomialFunctions}`, {
				position: 'top-right',
			});
		},
		calculateErrors(): void {
			this.errors.mae = mathUtils.getMAE(
				this.getInputPoints,
				this.aproximatedPoints
			);
			this.errors.mse = mathUtils.getMSE(
				this.getInputPoints,
				this.aproximatedPoints
			);
			this.errors.maxAe = mathUtils.getMaxAE(
				this.getInputPoints,
				this.aproximatedPoints
			);

			this.$toast.info(
				`Wyliczone błędy: MAE: ${this.errors.mae}, MSE: ${this.errors.mse}, maxAe: ${this.errors.maxAe}`
			);
		},
		clearState(): void {
			this.polynomialFunctions = [];
			this.result = 0;
			this.inputPoints = [];
			this.aproximatedPoints = [];
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
