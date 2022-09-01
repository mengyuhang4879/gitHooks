import style from '../index.module.less';
import { Tag, Space, Avatar } from 'antd';
import { inject, observer } from 'mobx-react';

const Header = props => {
    const { info } = props.store.approval.dic;

    return (
        <div className={style.header}>
            <div className={style.user}>
                <Space>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <span className={style.username}>{info.username}</span>
                </Space>
            </div>
            <div className={style.status}>
                <div className={style['status-top']}>
                    <span>当前状态</span>
                    <Tag>{info.status}</Tag>
                </div>
                <div className={style['status-top']}>
                    <span>发起人</span>
                    <span>{info.sponsor}</span>
                </div>
                <div className={style['status-top']}>
                    <span>发起人部门</span>
                    <span>{info.sponsorDepartment}</span>
                </div>
                <div className={style['status-top']}>
                    <span>流程版本号</span>
                    <span>{info.version}</span>
                </div>
            </div>
        </div>
    );
};

export default inject('store')(observer(Header));
