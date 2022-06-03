import Expression from '@/types/expression.type';

class InterpolationService {
	interpolatedExpression: Expression;
	interpolatingExpression: Expression;

	constructor(
		interpolatedExpression: Expression,
		interpolatingExpression: Expression
	) {
		this.interpolatedExpression = interpolatedExpression;
		this.interpolatingExpression = interpolatingExpression;
	}

}
