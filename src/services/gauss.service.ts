const gaussService = {
	gauss: (A: any, x: any) => {
		let i, k, j;

		// Just make a single matrix
		for (i = 0; i < A.length; i++) {
			A[i].push(x[i]);
		}
		const n = A.length;

		for (i = 0; i < n; i++) {
			// Search for maximum in this column
			let maxEl = Math.abs(A[i][i]);
			let maxRow = i;
			for (k = i + 1; k < n; k++) {
				if (Math.abs(A[k][i]) > maxEl) {
					maxEl = Math.abs(A[k][i]);
					maxRow = k;
				}
			}

			// Swap maximum row with current row (column by column)
			for (k = i; k < n + 1; k++) {
				const tmp = A[maxRow][k];
				A[maxRow][k] = A[i][k];
				A[i][k] = tmp;
			}

			// Make all rows below this one 0 in current column
			for (k = i + 1; k < n; k++) {
				const c = -A[k][i] / A[i][i];
				for (j = i; j < n + 1; j++) {
					if (i === j) {
						A[k][j] = 0;
					} else {
						A[k][j] += c * A[i][j];
					}
				}
			}
		}
	},
};

export default gaussService;
