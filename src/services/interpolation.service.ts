import Point from '@/types/point.type';
import { notification } from 'ant-design-vue';

const interpolationService = {
	interpolatePolynominal: (x: number, points: Point[]) => {
		return points
			.map((point, index) => {
				let functions = 1;
				points
					.filter((_, innerIndex) => innerIndex !== index)
					.forEach((obj) => {
						functions *= (x - obj.x) / (point.x - obj.x);
					});
				functions *= point.y;
				return functions;
			})
			.reduce((x, y) => x + y);
	},

	getInterpolationPolynomial: (x: number, points: Point[]) => {
		return points
			.map((point, index) => {
				let functions = '';
				points
					.filter((_, innerIndex) => innerIndex !== index)
					.forEach((obj) => {
						functions += `(${x} - ${obj.x}) / (${point.x} - ${obj.x}) *`;
					});
				functions += `${point.y}`;
				return functions;
			})
			.reduce((x, y) => `${x} + ` + y);
	},
} as const;

export default interpolationService;
