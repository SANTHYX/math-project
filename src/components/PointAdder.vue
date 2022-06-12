<template>
	<a-card>
		<a-form layout="vertical">
			<a-form-item :label="$t('Pass X')">
				<a-input-number
					defaultValue="0"
					v-model:value="editablePoint.point.x"
					:step="0.01"
					:min="0"
					style="width: 100%"
				/>
			</a-form-item>
			<template v-if="!isUnknown">
				<a-form-item :label="$t('Pass Y')">
					<a-input-number
						defaultValue="0"
						v-model:value="editablePoint.point.y"
						:step="0.01"
						:min="0"
						style="width: 100%"
					/>
				</a-form-item>
			</template>
			<a-form-item :label="$t('Ustaw jako szukany punkt')">
				<a-checkbox v-model:checked="isUnknown" />
			</a-form-item>
			<a-button type="danger" shape="round" block="100%" @click="onInsert">
				<a-plus-icon />&nbsp;{{ $t('Insert') }}
			</a-button>
		</a-form>
	</a-card>
</template>

<script lang="ts">
import { PlusSquareOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { v4 as uuidv4, v4 } from 'uuid';
import EditablePoint from '@/types/editablePoint.type';

export default defineComponent({
	name: 'PointAdder',
	components: {
		'a-plus-icon': PlusSquareOutlined,
	},
	computed: {},
	data: () => ({
		editablePoint: {
			key: '',
			point: {
				x: 0,
				y: 0,
			},
		} as EditablePoint,
		isUnknown: false as boolean,
	}),
	methods: {
		onInsert(): void {
			if (this.isUnknown) this.editablePoint.point.y = null;
			this.editablePoint.key = v4();
			this.$emit('insert', {
				key: this.editablePoint.key,
				point: {
					...this.editablePoint.point,
				},
			});
		},
	},
});
</script>
