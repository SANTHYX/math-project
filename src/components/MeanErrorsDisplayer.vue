<template>
	<a-card>
		<a-row>
			<a-col :span="8">
				<h3 :class="isSmallest(errors.mae) ? 'smallest-error' : 'error'">
					<component
						:is="
							isSmallest(errors.mae) ? 'a-caret-down-icon' : 'a-caret-up-icon'
						"
					/>{ errors.mae }}
				</h3>
			</a-col>
			<a-col :span="8">
				<h3 :class="isSmallest(errors.mae) ? 'smallest-error' : 'error'">
					<component
						:is="
							isSmallest(errors.mae) ? 'a-caret-down-icon' : 'a-caret-up-icon'
						"
					/>
					{{ errors.mse }}
				</h3>
			</a-col>
			<a-col :span="8">
				<h3 :class="isSmallest(errors.mae) ? 'smallest-error' : 'error'">
					<component
						:is="
							isSmallest(errors.mae) ? 'a-caret-down-icon' : 'a-caret-up-icon'
						"
					/>
					{{ errors.maxAe }}
				</h3>
			</a-col>
		</a-row>
	</a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue';

export default defineComponent({
	name: 'MeanErrorsDisplayer',
	components: {
		'a-caret-down-icon': CaretDownOutlined,
		'a-caret-up-icon': CaretUpOutlined,
	},
	data: () => ({
		errors: {
			mse: 0 as number,
			mae: 0 as number,
			maxAe: 0 as number,
		},
	}),
	methods: {
		isSmallest(error: number) {
			return Object.values(this.errors).sort((a, b) => b - a)[0] === error;
		},
	},
});
</script>

<style lang="scss" scoped>
.smallest-error {
	color: greenyellow;
}

.error {
	color: rgb(155, 155, 155);
}
</style>
