import regression, { DataPoint } from 'regression';
import Point from '@/types/point.type';

const aproximationService = {
	aproximatePolinomoinal: (points: Point[]): Point[] => {
		const dataPoints = points.map((point) => [point.x, point.y]) as DataPoint[];
		const foundPoints = regression.polynomial(dataPoints).points;
		return foundPoints.map((result) => {
			return { x: result[0], y: result[1] } as Point;
		});
	},

	findPolinominalAproximationFunction: (points: Point[]): string => {
		const dataPoints = points.map((point) => [point.x, point.y]) as DataPoint[];
		return regression.polynomial(dataPoints).string;
	},
} as const;

export default aproximationService;
