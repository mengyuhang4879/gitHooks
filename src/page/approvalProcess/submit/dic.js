let dic = {
    treeData: [
        {
            title: '一级 1',
            value: '1',
            children: [
                {
                    title: '二级 1-1',
                    value: '1-1',
                    children: [
                        {
                            title: '三级 1-1-1',
                            value: '1-1-1'
                        }
                    ]
                }
            ]
        },
        {
            title: '一级 2',
            value: '2',
            children: [
                {
                    title: '二级 2-1',
                    value: '2-1',
                    children: [
                        {
                            title: '三级 2-1-1',
                            value: '2-1-1'
                        }
                    ]
                },
                {
                    title: '二级 2-2',
                    value: '2-2',
                    children: [
                        {
                            title: '三级 2-2-1',
                            value: '2-2-1'
                        }
                    ]
                }
            ]
        }
    ],
    treeProps: {
        showSearch: true,
        allowClear: true,
        treeCheckable: true,
        treeCheckStrictly: true,
        showCheckedStrategy: 'SHOW_ALL',
        maxTagCount: '3',
        placeholder: '请选择',
        style: {
            width: '200px'
        },
        dropdownStyle: {
            maxHeight: 400,
            overflow: 'auto'
        }
    }
};

export default dic;
