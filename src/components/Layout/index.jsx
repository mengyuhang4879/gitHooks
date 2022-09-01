import { Layout } from 'antd';
import NoMatch from '../NoMatch';
import { routerItems } from '../../router';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './style.m.less';

// loading页面
const Loading = () => (
        <>
            <div className="loadsvg">
                <div>loading...</div>
            </div>
        </>
    ),
    { Content } = Layout,
    rotuerViews = routers => {
        if (routers && routers.length) {
            return routers.map(({ path, Component, children, redirect }) => {
                return children && children.length ? (
                    <Route
                        path={path}
                        key={path}
                        element={
                            <Suspense fallback={<Loading />}>
                                <Component />
                            </Suspense>
                        }
                    >
                        {rotuerViews(children)} // 递归遍历子路由
                        {redirect ? (
                            <Route
                                path={path}
                                element={<Navigate to={redirect} />}
                            ></Route>
                        ) : (
                            <Route
                                path={path}
                                element={<Navigate to={children[0].path} />}
                            ></Route>
                        )}
                    </Route>
                ) : (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Suspense fallback={<Loading />}>
                                <Component />
                            </Suspense>
                        }
                    ></Route>
                );
            });
        }
    };

function GLayout() {
    return (
        <Layout>
            <Content>
                <Routes>
                    {rotuerViews(routerItems)}
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </Content>
        </Layout>
    );
}

export default GLayout;
