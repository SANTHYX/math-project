import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
	RouteRecordRaw,
} from 'vue-router';
import StartPage from '../pages/StartPage.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'startPage',
		component: StartPage,
	},
	{
		path: '/instruction',
		name: 'instructionPage',
		component: () =>
			import(
				/* webpackChunkName: "instruction" */ '../pages/InstructionPage.vue'
			),
	},
	{
		path: '/calculator',
		name: 'calculatorPage',
		component: () =>
			import(
				/* webpackChunkName: "calculator" */ '../pages/CalculatorPage.vue'
			),
	},
	{
		path: '/:pathMatch(.*)*',
		component: StartPage,
	},
];

const router = createRouter({
	history: process.env.IS_ELECTRON
		? createWebHashHistory()
		: createWebHistory(),
	routes,
});

export default router;
