<template>
    <Select
        :value="props.value"
        mode="multiple"
        placeholder="Inserted are removed"
        style="width: 100%"
        optionLabelProp="label"
        :filterOption="filterOption"
        :options="urlOptions"
        @update:value="updateModuleValue"
    />
</template>
<script lang="ts" setup>
    import { Select } from 'ant-design-vue';
    import { ref, defineEmits } from 'vue';
    import { getUrlList } from '/@/api/demo/system';

    const urlOptions = ref<any[]>([]);
    const emit = defineEmits(['update:value']);
    const props = defineProps<{
        value: any;
    }>();
    const getUrls = async () => {
        const params = {
            pageSize: 100,
            page: 1,
        };
        const res = await getUrlList(params);
        urlOptions.value = res.items.map((item) => {
            return {
                value: item.id,
                label: item.url,
            };
        });
        urlOptions.value.sort((a, b) => (props.value.includes(b.value) ? -1 : 1));
    };
    const updateModuleValue = (value: any) => {
        emit('update:value', value);
        urlOptions.value.sort((a, b) => (props.value.includes(b.value) ? -1 : 1));
    };

    const filterOption = (inputValue: any, option: any) => {
        return option.label.includes(inputValue);
    };
    getUrls();
</script>
