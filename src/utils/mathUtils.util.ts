import Expression from '@/types/expression.type';
import Point from '@/types/point.type';

const mathUtils = {
	findFunctionByPoints: (points?: Point[]): Expression => {
		return {
			top: '',
			bottom: '',
		};
	},
} as const;

export default mathUtils;
