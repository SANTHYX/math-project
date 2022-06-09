import mathUtils from '@/utils/mathUtils.util';

test('calc MAE', () => {
	const originalSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.8, y: 3 },
		{ x: 2.91, y: 4 },
	];
	const aproximatedSet = [
		{ x: 1.25, y: 1.75 },
		{ x: 2.3, y: 2.77 },
		{ x: 2.8, y: 3.26 },
		{ x: 2.91, y: 3.36 },
	];

	const mae = mathUtils.getMAE(originalSet, aproximatedSet);
	expect(mae).toBe(0.4425);
	expect(mae).toBeGreaterThan(0);
});

test('calc MSE', () => {
	const originalSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.8, y: 3 },
		{ x: 2.91, y: 4 },
	];
	const aproximatedSet = [
		{ x: 1.25, y: 1.75 },
		{ x: 2.3, y: 2.77 },
		{ x: 2.8, y: 3.26 },
		{ x: 2.91, y: 3.36 },
	];

	const mse = mathUtils.getMSE(originalSet, aproximatedSet);
	expect(mse).toBe(0.23102500000000004);
	expect(mse).toBeGreaterThan(0);
});

test('calc MaxAE', () => {
	const originalSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.8, y: 3 },
		{ x: 2.91, y: 4 },
	];
	const aproximatedSet = [
		{ x: 1.25, y: 1.75 },
		{ x: 2.3, y: 2.77 },
		{ x: 2.8, y: 3.26 },
		{ x: 2.91, y: 3.36 },
	];

	const maxAE = mathUtils.getMaxAE(originalSet, aproximatedSet);
	expect(maxAE).toBe(0.6400000000000001);
	expect(maxAE).toBeGreaterThan(0);
});
