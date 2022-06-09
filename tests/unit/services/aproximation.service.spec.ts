import aproximationService from '@/services/aproximation.service';
import Point from '@/types/point.type';

test('test aproximation of aproximatePolynominal', () => {
	const testSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.8, y: 3 },
	] as Point[];
	const intepolationResult =
		aproximationService.aproximatePolinomoinal(testSet);
	expect(intepolationResult).toStrictEqual([
		{ x: 1.25, y: 1.89 },
		{ x: 2.3, y: 2.49 },
		{ x: 2.8, y: 2.78 },
	]);
	expect(intepolationResult).not.toEqual([]);
});

test('test aproximation of aproximatePolynominal of 2 grade', () => {
	const testSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.8, y: 3 },
		{ x: 2.91, y: 4 },
	] as Point[];
	const intepolationResult =
		aproximationService.aproximatePolinomoinal(testSet);
	expect(intepolationResult).toStrictEqual([
		{ x: 1.25, y: 1.75 },
		{ x: 2.3, y: 2.77 },
		{ x: 2.8, y: 3.26 },
		{ x: 2.91, y: 3.36 },
	]);
	expect(intepolationResult).not.toEqual([]);
});

test('test aproximation of aproximatePolynominal of 3 grade', () => {
	const testSet = [
		{ x: 1.25, y: 2 },
		{ x: 2.3, y: 2.15 },
		{ x: 2.4, y: 3 },
		{ x: 2.8, y: 4.2 },
		{ x: 3, y: 4.6 },
	] as Point[];
	const intepolationResult =
		aproximationService.aproximatePolinomoinal(testSet);
	expect(intepolationResult).toStrictEqual([
		{ x: 1.25, y: 1.56 },
		{ x: 2.3, y: 3.11 },
		{ x: 2.4, y: 3.26 },
		{ x: 2.8, y: 3.85 },
		{ x: 3, y: 4.15 },
	]);
	expect(intepolationResult).not.toEqual([]);
});
