import { useSearchParams } from 'react-router-dom';
import style from './index.module.less';
import { Space, Button, Modal, Form, Input } from 'antd';
import Header from './Header';
import Content from './Content';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

const Approval = props => {
    const { approval } = props.store,
        //获取从提交按钮传递过来的参数
        [params] = useSearchParams();
    let id = params.get('id');

    console.log(id);

    //点击底部按钮
    const handleBtn = () => {
            approval.setVisible(true);
        },
        //点击弹窗确定按钮
        handleOk = () => {
            approval.setVisible(false);
            console.log(toJS(approval.formData));
            console.log(toJS(approval.commentForm));
            window.open('/approval' + (id ? `?id=${id}` : ''), '_self');
        };

    return (
        <div className={style.approval}>
            <Header />
            <Content />
            <div className={style.footer}>
                <Space>
                    {approval.dic.buttonGroup.map(v => (
                        <Button
                            onClick={() => handleBtn(v.code)}
                            key={v.code}
                            type="primary"
                        >
                            {v.text}
                        </Button>
                    ))}
                    <Button>撤销</Button>
                </Space>
            </div>
            {/*点击按钮之后的弹窗*/}
            <Modal
                title="审批意见"
                visible={approval.visible}
                onOk={handleOk}
                cancelText="取消"
                okText="确认"
                onCancel={() => approval.setVisible(false)}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    initialValues={approval.commentForm}
                    onValuesChange={approval.onValuesChange}
                >
                    <Form.Item label="审批意见" name="approvalComments">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default inject('store')(observer(Approval));
