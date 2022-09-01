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
            console.log('我是子应用，我检测到数据了：hahaaa', state);
            global.setGlobal(state);
        }, true);
    }
    render() {
        return (
            <div className="App">
                <BrowserRouter
                    history={history}
                    basename={window.__POWERED_BY_QIANKUN__ ? '/subProject' : '/'}
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
