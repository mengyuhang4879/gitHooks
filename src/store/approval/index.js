import { observable, action, makeObservable } from 'mobx';
import dic from './mock';
import Schema from './schemaAndAuth/Schema.json';
import authStatus from './schemaAndAuth/authStatus.json';

class Approval {
    constructor() {
        makeObservable(this);
    }

  //mock数据
  @observable
      dic = dic;

  //schema
  @observable
      Schema = Schema;

  //权限列表
  @observable
      authStatus = authStatus;

  //弹窗
  @observable
      visible = false;

  @action
      setVisible = flag => {
          this.visible = flag;
      };

  //schema表单数据
  @observable
      formData = {};

  @action
      setFormData = data => {
          this.formData = data;
      };

  //审批意见
  @observable
      commentForm = {
          approvalComments: '没意见'
      };

  @action
      onValuesChange = changedValues => {
          this.commentForm = { ...this.commentForm, ...changedValues };
      };

  //内容模块其他单选状态
  @observable
      contentOtherStatus = '0';

  @action
      setContentOtherStatus = e => {
          this.contentOtherStatus = e.target.value;
      };

  //评论
  @observable
      textAreaValue = '';

  @action
      setTextAreaValue = e => {
          this.textAreaValue = e.target.value;
      };
}

export default new Approval();
