import './public-path';
import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'mobx-react';
import actions from './actions';

const Enter = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

let root = null;

if (!window.__POWERED_BY_QIANKUN__) {
    const container = document.getElementById('root');

    root = createRoot(container);
    root.render(<Enter />);
}

// bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
// 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
export async function bootstrap() {
    console.log('react app bootstraped');
}

// 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
export async function mount(props) {
    actions.setActions(props);
    console.log('主应用传递过来的值，在这里通过 props接收');
    const container = props.container
        ? props.container.querySelector('#root')
        : document.getElementById('root');

    root = createRoot(container);
    root.render(<Enter />);
}

// 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
export async function unmount(props) {
    root.unmount(
        props.container
            ? props.container.querySelector('#root')
            : document.getElementById('root')
    );
}

// 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
export async function update(props) {
    console.log('update props', props);
}

reportWebVitals();

if (process.env.NODE_ENV === 'development') {
    window.qiankunLifecycle = {
        bootstrap,
        mount,
        unmount,
        update
    };
}
