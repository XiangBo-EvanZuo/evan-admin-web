<template>
    <div>
        <BasicTable @register="registerTable">
            <template #toolbar>
                <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <TableAction
                        :actions="[
                            {
                                label: '编辑URL',
                                icon: 'clarity:note-edit-line',
                                onClick: handleEdit.bind(null, record),
                            },
                            {
                                label: '编辑菜单',
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
    import { defineComponent } from 'vue';

    import { BasicTable, useTable, TableAction } from '/@/components/Table';
    import { getRoleListByPage } from '/@/api/demo/system';

    import { useDrawer } from '/@/components/Drawer';
    import RoleDrawer from './RoleDrawer.vue';

    import { columns, searchFormSchema } from './role.data';
    // import { useI18n } from '/@/hooks/web/useI18n';
    // import { createActionColumn } from './action';

    export default defineComponent({
        name: 'RoleManagement',
        components: { BasicTable, RoleDrawer, TableAction },
        setup() {
            const [registerDrawer, { openDrawer }] = useDrawer();
            const [registerTable, { reload }] = useTable({
                title: '角色列表',
                api: getRoleListByPage,
                columns,
                formConfig: {
                    labelWidth: 120,
                    schemas: searchFormSchema,
                },
                useSearchForm: true,
                showTableSetting: true,
                bordered: true,
                showIndexColumn: false,
                actionColumn: {
                    width: 230,
                    title: '操作',
                    dataIndex: 'action',
                    // slots: { customRender: 'action' },
                    fixed: undefined,
                },
                // actionColumn: createActionColumn((value) => {
                //     console.log({ value });
                // }),
            });
            //             title: t('component.upload.operating'),
            // dataIndex: 'action',
            // fixed: false,
            // customRender: ({ record }) => {
            //     const actions: ActionItem[] = [
            //         {
            //             label: t('component.upload.del'),
            //             color: 'error',
            //             onClick: handleRemove.bind(null, record),
            //         },
            //     ];
            //     // if (checkImgType(record)) {
            //     //   actions.unshift({
            //     //     label: t('component.upload.preview'),
            //     //     onClick: handlePreview.bind(null, record),
            //     //   });
            //     // }
            //     return <TableAction actions={actions} outside={true} />;
            // },

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
            };
        },
    });
</script>
