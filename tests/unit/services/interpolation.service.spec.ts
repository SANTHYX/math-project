import interpolationService from '@/services/interpolation.service';
import Point from '@/types/point.type';

test('test interpolation of interpolatePolynominal', () => {
	const testSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.8, y: 3 },
	] as Point[];
	const intepolationResult = interpolationService.interpolatePolynominal(
		3,
		testSet
	);
	expect(intepolationResult).toBe(3.4806451612903233);
	expect(intepolationResult).not.toBe(0);
	expect(intepolationResult).toBeGreaterThan(testSet[2].y);
});

test('test interpolation of interpolatePolynominal of 2 grade', () => {
	const testSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.8, y: 3 },
		{ x: 2.91, y: 4 },
	] as Point[];
	const intepolationResult = interpolationService.interpolatePolynominal(
		3.33,
		testSet
	);
	expect(intepolationResult).toBe(12.049988972031553);
	expect(intepolationResult).not.toBe(0);
	expect(intepolationResult).toBeGreaterThan(testSet[3].y);
});

test('test interpolation of interpolatePolynominal of 3 grade', () => {
	const testSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.4, y: 3 },
		{ x: 2.8, y: 4.2 },
		{ x: 3, y: 4.6 },
	] as Point[];
	const intepolationResult = interpolationService.interpolatePolynominal(
		3.4,
		testSet
	);
	expect(intepolationResult).toBe(11.989312190514347);
	expect(intepolationResult).not.toBe(0);
	expect(intepolationResult).toBeGreaterThan(testSet[4].y);
});
