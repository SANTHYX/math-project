import Expression from '@/types/expression.type';
import Point from '@/types/point.type';

const mathUtils = {
	findFunction: (points?: Point[]): Expression => {
		return {
			id: 0,
			top: '',
			bottom: '',
		};
	},
} as const;

export default mathUtils;
