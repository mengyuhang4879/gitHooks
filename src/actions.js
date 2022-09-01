function emptyAction() {
    console.warn('Current execute action is empty!');
}

// 我们首先设置一个用于通信的Actions类

class Actions {
    actions = {
        onGlobalStateChange: emptyAction,
        setGlobalState: emptyAction
    };
    // 默认值为空Action

    // 设置actions
    setActions(actions) {
        this.actions = actions;
    }

    // 映射
    onGlobalStateChange(...args) {
        return this.actions.onGlobalStateChange(...args);
    }
    // 映射
    setGlobalState(...args) {
    // 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
        return this.actions.setGlobalState(...args);
    }
}

const actions = new Actions();

export default actions;
