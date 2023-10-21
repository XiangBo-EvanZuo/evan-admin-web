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
            <template #menu="{ model, field }">
                <BasicTree
                    v-model:value="model[field]"
                    :treeData="treeData"
                    :fieldNames="{ title: 'name', key: 'id' }"
                    checkable
                    toolbar
                    title="菜单分配"
                />
            </template>
        </BasicForm>
    </BasicDrawer>
</template>
<script lang="ts" setup>
    import { ref, computed, unref } from 'vue';
    import { BasicForm, useForm } from '/@/components/Form/index';
    import { formSchema } from './role.data';
    import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
    import { BasicTree, TreeItem } from '/@/components/Tree';

    import { getMenuList, addAuthUrl, updateAuthUrl } from '/@/api/demo/system';

    const emit = defineEmits(['success', 'register']);
    const isUpdate = ref(true);
    const treeData = ref<TreeItem[]>([]);

    const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
    });

    const recordValue = ref<any>({});
    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        console.log({ data });
        resetFields();
        updateSchema({
            field: 'moduleId',
            componentProps: { options: data.labelList },
        });
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
            treeData.value = (await getMenuList()) as any as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;
        if (data.record) {
            recordValue.value = data.record;
        } else {
            recordValue.value = {};
        }
        if (unref(isUpdate)) {
            setFieldsValue({
                ...data.record,
            });
        }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));
    const createUrl = async (values: any) => {
        const res = await addAuthUrl(values);
        console.log(res);
    };
    const editUrl = async (values: any, others: any) => {
        const params = {
            ...values,
            ...others,
        };
        const res = await updateAuthUrl(params);
        console.log(res);
    };
    async function handleSubmit() {
        try {
            const values = await validate(['moduleId']);
            setDrawerProps({ confirmLoading: true });
            if (recordValue.value.id) {
                await editUrl(values, { id: recordValue.value.id });
            } else {
                await createUrl(values);
            }
            closeDrawer();
            emit('success');
        } finally {
            setDrawerProps({ confirmLoading: false });
        }
    }
</script>
