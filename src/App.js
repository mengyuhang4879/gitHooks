import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import { createBrowserHistory } from 'history';
import actions from './actions';
import { inject, observer } from 'mobx-react';

const history = createBrowserHistory();

@inject('store')
@observer
class App extends Component {
    componentDidMount() {
        const { global } = this.props.store;

        actions.onGlobalStateChange(state => {
            console.log('我是子应用，我检测到数据了：hah', state);
            global.setGlobal(state);
        }, true); //onGlobalStateChange的第二个参数设置为true，则会立即触发一次观察者函数
    }
    render() {
        return (
            <div className="App">
                <BrowserRouter
                    history={history}
                    basename={
                        window.__POWERED_BY_QIANKUN__ ? '/subProject' : '/'
                    }
                >
                    <ConfigProvider prefixCls="tenant">
                        <Layout />
                    </ConfigProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
