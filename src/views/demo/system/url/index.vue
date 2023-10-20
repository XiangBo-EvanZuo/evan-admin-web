<template>
    <div>
        <BasicTable @register="registerTable">
            <template #toolbar>
                <a-button type="primary" @click="handleCreate"> 新增URL </a-button>
                <a-button type="primary" @click="setData"> setData </a-button>
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
    import { getUrlList } from '/@/api/demo/system';

    import { useDrawer } from '/@/components/Drawer';
    import RoleDrawer from './RoleDrawer.vue';

    import { columns } from './role.data';

    export default defineComponent({
        name: 'RoleManagement',
        components: { BasicTable, RoleDrawer, TableAction },
        setup() {
            const searchFormSchema2: Ref<FormSchema[]> = ref([
                {
                    field: 'url',
                    label: 'URL',
                    component: 'Input',
                },
                {
                    field: 'moduleId',
                    label: 'moduleId',
                    component: 'Select',
                    componentProps: {
                        options: [],
                    },
                    colProps: { span: 8 },
                },
            ]);
            const setData = () => {
                if (searchFormSchema2.value[1].componentProps) {
                    searchFormSchema2.value[1].componentProps = {
                        options: [
                            { label: '启用', value: 1 },
                            { label: '停用', value: 2 },
                            { label: '停用', value: 3 },
                            { label: '停用', value: 4 },
                        ],
                    };
                }
            };
            const [registerDrawer, { openDrawer }] = useDrawer();
            const [registerTable, { reload }] = useTable({
                title: '角色列表',
                api: getUrlList,
                columns,
                formConfig: {
                    labelWidth: 120,
                    schemas: searchFormSchema2.value,
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
                });
            }

            function handleEdit(record: Recordable) {
                openDrawer(true, {
                    record,
                    isUpdate: true,
                });
            }

            function handleDelete(record: Recordable) {
                console.log(record);
            }

            function handleSuccess() {
                reload();
            }

            return {
                registerTable,
                registerDrawer,
                handleCreate,
                handleEdit,
                handleDelete,
                handleSuccess,
                setData,
            };
        },
    });
</script>
