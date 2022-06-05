import Expression from '@/types/expression.type';

class AproximationService {
	expressions: Expression[];

	public constructor(expressions: Expression[]) {
		this.expressions = expressions;
	}
}

export default AproximationService;
