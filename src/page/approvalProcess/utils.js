const getStatus = (componentItem, status) => {
    if (status === 'READONLY') {
        //如果form.item设置了只读 那么需要设置其子元素都为disable
        if (componentItem.children && componentItem.children.length > 0) {
            componentItem.children.forEach(v => (v.props.disabled = true));
        }
    }
    if (status === 'HIDDEN') {
        componentItem.condition = false;
    }
};

//递归解析schema
export const resolveSchema = (schemaComponentsTree, authStatus) => {
    if (schemaComponentsTree && schemaComponentsTree.length > 0) {
        schemaComponentsTree.forEach(v => {
            authStatus.forEach(vs => {
                if (v.id === vs.id) {
                    getStatus(v, vs.fieldBehavior);
                }
            });
            resolveSchema(v.children, authStatus);
        });
    }
};
