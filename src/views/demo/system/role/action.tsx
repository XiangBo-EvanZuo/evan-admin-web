import { ActionItem, BasicColumn, TableAction } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export function createActionColumn(handleRemove: Function): BasicColumn {
    return {
        width: 120,
        title: t('component.upload.operating'),
        dataIndex: 'action',
        fixed: false,
        customRender: ({ record }) => {
            const actions: ActionItem[] = [
                {
                    label: t('component.upload.del'),
                    color: 'error',
                    onClick: handleRemove.bind(null, record),
                },
            ];
            // if (checkImgType(record)) {
            //   actions.unshift({
            //     label: t('component.upload.preview'),
            //     onClick: handlePreview.bind(null, record),
            //   });
            // }
            return <TableAction actions={actions} outside={true} />;
        },
    };
}
