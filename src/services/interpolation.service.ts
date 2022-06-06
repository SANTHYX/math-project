import Point from '@/types/point.type';

const interpolationService = {
	interpolatePolynominal: (x: number, points: Point[]) => {
		return points
			.map((point, index) => {
				let functions = 1;
				points
					.filter((_, i) => i !== index)
					.forEach((obj) => {
						functions *= (x - obj.x) / (point.x - obj.x);
					});
				functions *= point.y;
				return functions;
			})
			.reduce((x, y) => x + y);
	},
} as const;

export default interpolationService;
