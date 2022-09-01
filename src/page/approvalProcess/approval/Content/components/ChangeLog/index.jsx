import { Steps, Tag } from 'antd';
import React from 'react';
import style from '../../../index.module.less';
import { inject, observer } from 'mobx-react';

const { Step } = Steps,
    ChangeLog = props => {
        const { changeLogAry } = props.store.approval.dic;

        return (
            <div className={style['change-log']}>
                {changeLogAry.map(v => (
                    <div className={style['change-log-item']} key={v.id}>
                        <Tag color="#108ee9">{v.date}</Tag>
                        <Steps progressDot current="" direction="vertical">
                            {v.details.map(vs => (
                                <Step
                                    title={
                                        <>
                                            <p>{vs.time}</p>
                                            <p className={style['dec']}>
                                                {vs.dec}
                                            </p>
                                        </>
                                    }
                                />
                            ))}
                        </Steps>
                    </div>
                ))}
            </div>
        );
    };

export default inject('store')(observer(ChangeLog));
