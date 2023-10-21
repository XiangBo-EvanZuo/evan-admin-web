<template>
    <div>
        <BasicTable @register="registerTable">
            <template #toolbar>
                <a-button type="primary" @click="handleCreate"> 新增URL </a-button>
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <TableAction
                        :actions="[
                            {
                                icon: 'clarity:note-edit-line',
                                onClick: handleEdit.bind(null, record),
                            },
                            {
                                icon: 'ant-design:delete-outlined',
                                color: 'error',
                                popConfirm: {
                                    title: '是否确认删除',
                                    placement: 'left',
                                    confirm: handleDelete.bind(null, record),
                                },
                            },
                        ]"
                    />
                </template>
            </template>
        </BasicTable>
        <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    </div>
</template>
<script lang="ts">
    import { Ref, defineComponent, ref } from 'vue';

    import { BasicTable, useTable, TableAction, FormSchema } from '/@/components/Table';
    import { getUrlList, getModuleList, deleteAuthUrl } from '/@/api/demo/system';

    import { useDrawer } from '/@/components/Drawer';
    import RoleDrawer from './RoleDrawer.vue';

    import { columns } from './role.data';

    export default defineComponent({
        name: 'RoleManagement',
        components: { BasicTable, RoleDrawer, TableAction },
        setup() {
            const labelList: Ref<Record<any, any>> = ref([]);
            const searchFormSchema2: FormSchema[] = [
                {
                    field: 'path',
                    label: 'Path',
                    component: 'Input',
                },
                {
                    field: 'moduleId',
                    label: 'moduleId',
                    component: 'Select',
                    componentProps: {
                        options: labelList.value,
                    },
                    colProps: { span: 8 },
                },
            ];
            const setData = async () => {
                const res = await getModuleList();
                labelList.value = res.map((item) => {
                    return {
                        value: item.id,
                        label: item.name,
                    };
                });
                searchFormSchema2[1].componentProps = {
                    options: labelList.value,
                };
            };
            const [registerDrawer, { openDrawer }] = useDrawer();
            const [registerTable, { reload, setPagination }] = useTable({
                title: '角色列表',
                api: getUrlList,
                columns,
                formConfig: {
                    labelWidth: 120,
                    schemas: searchFormSchema2,
                },
                useSearchForm: true,
                showTableSetting: true,
                bordered: true,
                showIndexColumn: false,
                actionColumn: {
                    width: 80,
                    title: '操作',
                    dataIndex: 'action',
                    // slots: { customRender: 'action' },
                    fixed: undefined,
                },
            });

            function handleCreate() {
                openDrawer(true, {
                    isUpdate: false,
                    labelList: labelList.value,
                });
            }

            function handleEdit(record: Recordable) {
                openDrawer(true, {
                    record,
                    isUpdate: true,
                    labelList: labelList.value,
                });
            }

            async function handleDelete(record: Recordable) {
                await deleteAuthUrl({ id: record.id });
                handleSuccess();
            }

            function handleSuccess() {
                setPagination({
                    current: 1,
                });
                reload();
            }
            setData();
            return {
                registerTable,
                registerDrawer,
                handleCreate,
                handleEdit,
                handleDelete,
                handleSuccess,
                labelList,
            };
        },
    });
</script>
