import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
    {
        title: '角色名称',
        dataIndex: 'roleName',
        width: 100,
    },
    {
        title: '角色值',
        dataIndex: 'roleValue',
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
    {
        title: '备注',
        dataIndex: 'remark',
    },
    {
        title: '包含菜单',
        dataIndex: 'menuLength',
    },
    {
        title: '包含URL',
        dataIndex: 'urlListLength',
    },
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'roleNme',
        label: '角色名称',
        component: 'Input',
        colProps: { span: 8 },
    },
    {
        field: 'status',
        label: '状态',
        component: 'Select',
        componentProps: {
            options: [
                { label: '启用', value: '1' },
                { label: '停用', value: '0' },
            ],
        },
        colProps: { span: 8 },
    },
];

export const formSchema: FormSchema[] = [
    {
        field: 'roleName',
        label: '角色名称',
        required: true,
        component: 'Input',
    },
    {
        field: 'roleValue',
        label: '角色值',
        required: true,
        component: 'Input',
    },
    {
        field: 'status',
        label: '状态',
        component: 'RadioButtonGroup',
        defaultValue: '0',
        componentProps: {
            options: [
                { label: '启用', value: 1 },
                { label: '停用', value: 0 },
            ],
        },
    },
    {
        label: '备注',
        field: 'remark',
        component: 'InputTextArea',
    },
    {
        label: ' ',
        field: 'menu',
        slot: 'menu',
        component: 'Input',
    },
    {
        label: ' ',
        field: 'urlList',
        slot: 'urlList',
        component: 'Input',
    },
];
