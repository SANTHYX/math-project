import Point from '@/types/point.type';

const mathUtils = {
	getMSE: (base: Point[], results: Point[]): number => {
		let sum = 0;
		base.forEach((base, index) => {
			if (base.x !== results[index].x) throw new Error('invalid operation');
			sum += Math.pow(base.y - results[index].y, 2);
		});

		return sum / base.length;
	},

	getMAE: (base: Point[], results: Point[]): number => {
		let sum = 0;
		base.forEach((base, index) => {
			if (base.x !== results[index].x) throw new Error('invalid operation');
			sum += Math.abs(base.y - results[index].y);
		});

		return sum / base.length;
	},

	getMaxAE: (base: Point[], results: Point[]): number => {
		base.forEach((base, index) => {
			if (base.x !== results[index].x) throw new Error('invalid operation');
		});
		return base
			.map((base, index) => Math.abs(base.y - results[index].y))
			.sort((a, b) => b - a)[0];
	},
} as const;

export default mathUtils;
