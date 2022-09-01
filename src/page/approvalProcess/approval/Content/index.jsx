import React from 'react';
import Packages from '../../../../Packages.json';
import Schema from '../../submit/schemaAndAuth/Schema.json';
import LowCodeAnalysis from '../../../../components/LowCodeAnalysis';
import { inject, observer } from 'mobx-react';
import { Card, Steps, Radio } from 'antd';
import style from '../index.module.less';
import Comment from './components/Comment';
import ChangeLog from './components/ChangeLog';

const { Step } = Steps,
    Content = props => {
    //解构visible的原因是当此组件依赖的visible发生改变时会重新渲染，如果不解构出来则不会被重新渲染，那么就会导致LowCodeAnalysis组件获取不到ref的实例
        const {
                dic,
                setFormData,
                contentOtherStatus,
                setContentOtherStatus,
                visible
            } = props.store.approval,
            getChildFormData = data => {
                setFormData(data);
                console.log(visible);
            },
            //审批进度状态映射表
            progressMap = {
                submitted: { text: '提交申请', color: 'green' },
                Approved: { text: '审核通过', color: 'green' },
                Processing: { text: '处理中', color: 'orange' }
            },
            //计算steps进度条
            curStep = dic.progressAry.reduce(
                (prev, cur) =>
                    cur.status && cur.status !== 'Processing' ? (prev += 1) : prev,
                0
            );

        return (
            <div className={style.content}>
                {/*schema渲染*/}
                <Card>
                    <LowCodeAnalysis
                        needInitFormData={true} //需要设置初始值，新增不需要
                        getFormData={getChildFormData}
                        projectSchema={Schema}
                        defaultForm={dic.form}
                        packages={Packages}
                    />
                </Card>

                {/*    审批进度*/}
                <Card title="审批进度">
                    <Steps progressDot current={curStep} direction="vertical">
                        {dic.progressAry.map(v => (
                            <Step
                                key={v.id}
                                title={
                                    <div>
                                        <div>
                                            <span style={{ marginRight: '5px' }}>{v.user}</span>
                                            <span>{v.time}</span>
                                        </div>
                                        <p>{v.subtitle}</p>
                                    </div>
                                }
                                description={
                                    <>
                                        <span
                                            style={{
                                                color: progressMap[v.status].color,
                                                fontWeight: 'bold',
                                                marginRight: '5px'
                                            }}
                                        >
                                            {progressMap[v.status].text}
                                        </span>
                                        {v.status !== 'submitted' ? <span>{v.dec}</span> : null}
                                    </>
                                }
                            />
                        ))}
                    </Steps>
                </Card>

                <Card title="其他">
                    <Radio.Group
                        value={contentOtherStatus}
                        onChange={setContentOtherStatus}
                        buttonStyle="solid"
                    >
                        <Radio.Button value="0">评论</Radio.Button>
                        <Radio.Button value="1">变更记录</Radio.Button>
                    </Radio.Group>
                    {contentOtherStatus === '0' ? <Comment /> : <ChangeLog />}
                </Card>
            </div>
        );
    };

export default inject('store')(observer(Content));
