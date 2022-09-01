import { Input, Button, Space, Col } from 'antd';
import { inject, observer } from 'mobx-react';

const { TextArea } = Input,
    Comment = props => {
        const { textAreaValue, setTextAreaValue } = props.store.approval,
            handleSubmit = () => {
                console.log(textAreaValue);
            };

        return (
            <div style={{ marginTop: '10px' }}>
                <Space direction="vertical">
                    <Col>
                        <TextArea
                            value={textAreaValue}
                            onChange={setTextAreaValue}
                            style={{ width: '600px' }}
                            rows={4}
                        />
                    </Col>
                    <Col>
                        <Button type="primary" onClick={handleSubmit}>
                            发表
                        </Button>
                    </Col>
                </Space>
            </div>
        );
    };

export default inject('store')(observer(Comment));
