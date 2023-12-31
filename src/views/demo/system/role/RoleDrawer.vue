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
                <div class="flex flex-col">
                    <BasicTree
                        v-if="treeData.length && model[field]"
                        v-model:value="model[field]"
                        :treeData="treeDataFirstLevel"
                        :fieldNames="{ title: 'name', key: 'id' }"
                        checkable
                        toolbar
                        title="菜单分配-一级目录控制"
                    />
                    <BasicTree
                        v-if="treeData.length && model[field]"
                        :value="model[field]"
                        :treeData="treeData"
                        :fieldNames="{ title: 'name', key: 'id' }"
                        checkable
                        :disabled="true"
                        toolbar
                        title="菜单分配-查看"
                    />
                </div>
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

    import { getMenuList, updateRoleMenu } from '/@/api/demo/system';

    const emit = defineEmits(['success', 'register']);
    const isUpdate = ref(true);
    const treeData = ref<TreeItem[]>([]);
    const treeDataFirstLevel = ref<TreeItem[]>([]);
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
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
            treeData.value = (await getMenuList()) as any as TreeItem[];
            treeDataFirstLevel.value = treeData.value.map((item) => {
                return {
                    ...item,
                    children: [],
                };
            });
        }
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
                list: values.menu,
                roleId: recordValue.value.id,
            };
            await updateRoleMenu(params);
            closeDrawer();
            emit('success');
        } finally {
            setDrawerProps({ confirmLoading: false });
        }
    }
</script>
