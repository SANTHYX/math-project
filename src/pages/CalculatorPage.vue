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
								<a-card>
									<a-form layout="vertical">
										<a-form-item :label="$t('Pass X')">
											<a-input-number style="width: 100%" />
										</a-form-item>
										<a-form-item :label="$t('Pass Y')">
											<a-input-number style="width: 100%" />
										</a-form-item>
										<a-button type="primary" block="100%">
											<a-plus-icon />&nbsp;{{ $t('Insert') }}
										</a-button>
									</a-form>
								</a-card>
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
					<div class="tab-content"></div>
				</a-tab-pane>
				<a-tab-pane key="3">
					<template #tab>
						<a-excel-icon />
						{{ $t('Create Report') }}
					</template>
					<div class="tab-content">HI</div>
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
	},
	data: () => ({
		activeKey: 1 as number,
		result: 0 as number,
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
	}
}
</style>
