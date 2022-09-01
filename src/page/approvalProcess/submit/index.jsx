import React, { useState } from 'react';
import Schema from './schemaAndAuth/Schema.json';
import Packages from '../../../Packages.json';
import authStatus from './schemaAndAuth/authStatus.json';
import { resolveSchema } from '../utils';
import approvalNodes from './approvalNodes.json';
import LowCodeAnalysis from '../../../components/LowCodeAnalysis';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Space, Steps, Modal, TreeSelect } from 'antd';
import dic from './dic';
import style from './index.module.less';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps,
    Submit = () => {
        const [schema, setSchema] = useState(Schema),
            //点击更改权限按钮
            handleChange = () => {
                let schemaComponentsTree = schema.componentsTree[0].children || [];

                resolveSchema(schemaComponentsTree, authStatus);
                let schemaClone = JSON.parse(JSON.stringify(schema));

                setSchema(schemaClone);
            },
            [isModalVisible, setIsModalVisible] = useState(false),
            //选择树节点
            handleChangeTreeNode = (value, v) => {
                v.treeNode = value;
            };

        //获取根据schema渲染的页面设置的form数据
        let formData = {};
        const getChildFormData = data => {
                console.log('我是父组件', data);
                formData = { ...data };
            },
            //提交按钮
            navigate = useNavigate(),
            handleOk = () => {
                let obj = {};

                approvalNodes.forEach(v => {
                    if (v.hasApprovalRange) {
                        obj[v.activityId] = v.treeNode;
                    }
                });
                console.log(obj, schema, formData);
                setIsModalVisible(false);
                navigate('/approval?id=1111');
            };

        return (
            <>
                <button onClick={handleChange}>点击根据权限更改状态</button>
                <div className={style.lowcode}>
                    <LowCodeAnalysis
                        getFormData={getChildFormData}
                        projectSchema={schema}
                        packages={Packages}
                    />
                    <Space>
                        <Button type="primary" onClick={() => setIsModalVisible(true)}>
            提交
                        </Button>
                        <Button>取消</Button>
                    </Space>
                </div>
                <Modal
                    title="提交"
                    visible={isModalVisible}
                    onOk={handleOk}
                    cancelText="取消"
                    okText="确认"
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Steps progressDot current="" direction="vertical">
                        {approvalNodes.map(v => {
                            return v.hasApprovalRange ? (
                                <Step
                                    key={v.activityId}
                                    title={
                                        <div className={style['title-box']}>
                                            <div className={style['img-box']}>
                                                <PlusSquareOutlined />
                                            </div>
                                            <div>
                                                <div className={style['title']}>{v.operatorName}</div>
                                                <TreeSelect
                                                    {...dic.treeProps}
                                                    value={v.treeNode}
                                                    onChange={value => handleChangeTreeNode(value, v)}
                                                    placeholder={`请添加审批人${v.showName}`}
                                                    treeData={v.treeData}
                                                ></TreeSelect>
                                            </div>
                                        </div>
                                    }
                                />
                            ) : (
                                <Step
                                    key={v.activityId}
                                    title={
                                        <div className={style['title-box']}>
                                            <div className={style['img-box']}>
                                                <img src={v.operatorPhotoUrl} alt="" />
                                            </div>
                                            <div>
                                                <div className={style['title']}>{v.operatorName}</div>
                                                <div className={style['tenant-title']}>{v.showName}</div>
                                            </div>
                                        </div>
                                    }
                                />
                            );
                        })}
                    </Steps>
                </Modal>
            </>
        );
    };

export default Submit;
