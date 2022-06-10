<template>
	<a-card>
		<a-form layout="vertical">
			<a-form-item :label="$t('Pass X')">
				<a-input-number
					defaultValue="0"
					v-model="point.x"
					style="width: 100%"
				/>
			</a-form-item>
			<template v-if="!isUnknown">
				<a-form-item :label="$t('Pass Y')">
					<a-input-number
						defaultValue="0"
						v-model="point.y"
						style="width: 100%"
					/>
				</a-form-item>
			</template>
			<a-form-item :label="$t('Ustaw jako szukany punkt')">
				<a-checkbox v-model:checked="isUnknown" />
			</a-form-item>
			<a-button type="primary" block="100%" @click="onInsert">
				<a-plus-icon />&nbsp;{{ $t('Insert') }}
			</a-button>
		</a-form>
	</a-card>
</template>

<script lang="ts">
import Point from '@/types/point.type';
import { PlusSquareOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'PointEditor',
	components: {
		'a-plus-icon': PlusSquareOutlined,
	},
	computed: {},
	data: () => ({
		point: {
			x: 0,
			y: 0,
		} as Point,
		isUnknown: false as boolean,
	}),
	methods: {
		onInsert(): void {
			if (this.isUnknown) this.point.y = undefined;
			this.$emit('insert', this.point);
		},
	},
});
</script>
