<template>
    <BasicDrawer
        v-bind="$attrs"
        @register="registerDrawer"
        showFooter
        :title="getTitle"
        width="500px"
        @ok="handleSubmit"
    >
        <BasicForm @register="registerForm">
            <template #urlList="{ model, field }">
                <mutipleSelect v-model:value="model[field]" />
            </template>
        </BasicForm>
    </BasicDrawer>
</template>
<script lang="ts" setup>
    import { ref, computed, unref } from 'vue';
    import { BasicForm, useForm } from '/@/components/Form/index';
    import { formSchema } from './role.data';
    import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
    import mutipleSelect from './mutipleSelect.vue';
    import { updateRoleUrl } from '@/api/demo/system';

    const emit = defineEmits(['success', 'register']);
    const isUpdate = ref(true);
    const recordValue = ref<Record<string, string>>({});

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        recordValue.value = data?.record || {};
        if (unref(isUpdate)) {
            setFieldsValue({
                ...data.record,
            });
        }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

    async function handleSubmit() {
        try {
            const values = await validate();
            setDrawerProps({ confirmLoading: true });
            const params = {
                list: values.urlList,
                roleId: recordValue.value.id,
            };
            await updateRoleUrl(params);
            closeDrawer();
            emit('success');
        } finally {
            setDrawerProps({ confirmLoading: false });
        }
    }
</script>
