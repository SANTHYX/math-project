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
				<a-space>
					<a-button
						v-for="route in subPages"
						:key="route.key"
						type="primary"
						shape="round"
					>
						<component :is="route.iconComponent" />&nbsp;{{ $t(route.label) }}
					</a-button>
				</a-space>
			</a-page-header>
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
								<point-editor @insert="insertToArray($emit)" />
							</a-col>
							<a-col :span="10" offset="1">
								<a-divider>
									<border-bottom-icon />&nbsp;{{ $t('Overview') }}
								</a-divider>
								<a-card> </a-card>
							</a-col>
						</a-row>
					</div>
				</a-tab-pane>
				<a-tab-pane key="2">
					<template #tab>
						<a-line-chart-icon />
						{{ $t('Generate Chart') }}
					</template>
					<div class="tab-content">
						<a-row justify="center">
							<a-space direction="vertical" align="center">
								<a-chart-icon />
								<h1>{{ $t('Click To Generate Chart') }}</h1>
								<a-button
									type="danger"
									shape="round"
									@click="generateChart([])"
								>
									{{ $t('Generate Chart') }}
								</a-button>
							</a-space>
						</a-row>
					</div>
				</a-tab-pane>
				<a-tab-pane key="3">
					<template #tab>
						<a-excel-icon />
						{{ $t('Create Report') }}
					</template>
					<div class="tab-content">
						<a-row justify="center">
							<a-space direction="vertical" align="center">
								<a-file-icon />
								<h1>{{ $t('Click To Create Report') }}</h1>
								<a-button
									type="danger"
									shape="round"
									@click="generateChart([])"
								>
									{{ $t('Create Report') }}
								</a-button>
							</a-space>
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
import PointEditor from '@/components/PointEditor.vue';
import Point from '@/types/point.type';
import ChartIcon from '@/components/ChartIcon.vue';
import FileIcon from '@/components/FileIcon.vue';

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
		'point-editor': PointEditor,
		'a-chart-icon': ChartIcon,
		'a-file-icon': FileIcon,
	},
	computed: {},
	data: () => ({
		activeKey: 1 as number,
		result: 0 as number,
		collection: [] as Point[],
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
		insertToArray(point: unknown): void {
			this.collection.push(point as Point);
		},
		generateChart(points: Point[]): void {
			console.log(points);
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
