import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        width: 200,
    },
    {
        title: 'URL',
        dataIndex: 'url',
        width: 200,
    },
    {
        title: '模块名称',
        dataIndex: 'moduleName',
        width: 200,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        customRender: ({ record }) => {
            if (!Reflect.has(record, 'pendingStatus')) {
                record.pendingStatus = false;
            }
            return h(Switch as any, {
                checked: record.status === 1,
                checkedChildren: '停用',
                unCheckedChildren: '启用',
                loading: record.pendingStatus,
                onChange(checked: boolean) {
                    record.pendingStatus = true;
                    const newStatus = checked ? 1 : 0;
                    const { createMessage } = useMessage();
                    setRoleStatus(record.id, newStatus)
                        .then(() => {
                            record.status = newStatus;
                            createMessage.success(`已成功修改角色状态`);
                        })
                        .catch(() => {
                            createMessage.error('修改角色状态失败');
                        })
                        .finally(() => {
                            record.pendingStatus = false;
                        });
                },
            });
        },
    },
];

export const searchFormSchema: FormSchema[] = [
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
            options: [
                { label: '启用', value: 1 },
                { label: '停用', value: 2 },
                { label: '停用', value: 3 },
                { label: '停用', value: 4 },
            ],
        },
        colProps: { span: 8 },
    },
];

export const formSchema: FormSchema[] = [
    {
        field: 'url',
        label: 'URL',
        component: 'Input',
    },
    // {
    //     label: ' ',
    //     field: 'menu',
    //     slot: 'menu',
    //     component: 'Input',
    // },
];
