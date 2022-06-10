<template>
	<div>
		<FileExcelFilled class="file-icon" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FileExcelFilled } from '@ant-design/icons-vue';

export default defineComponent({
	name: 'FileIcon',
	components: { FileExcelFilled },
});
</script>

<style lang="scss" scope>
.file-icon {
	font-size: 200px;
}
</style>
