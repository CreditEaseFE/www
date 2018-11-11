import React from 'react';
import {Button, Form, Input, Radio, Table, Popconfirm, message, Icon} from 'antd';
import {axios, apis, qs} from '../../api';
import ContributeForm from './Contribute.Form';

class Contribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      contributeMode: localStorage.getItem('contributeMode') || 'sid-and-snsInfo'
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({isLoading: true});
        try {
          const params = {
            value: values.cookie,
            application: this.props.application
          };
          if (this.props.application === 1 && this.state.contributeMode === 'sid-and-snsInfo') {
            params.value = `SID=${values.sid}; snsInfo[101204453]=${values.snsInfo};`;
          }
          const data = await axios.post(apis.cookie, qs.stringify(params));
          if (data.code === 0) {
            message.success('贡献成功！');
            this.props.contributeCallback();
          } else {
            message.error(data.message);
          }
        } catch (e) {
          console.error(e);
        } finally {
          this.setState({isLoading: false});
          this.props.form.resetFields();
        }
      }
    });
  };

  changeContributeMode = event => {
    const contributeMode = event.target.value;
    this.setState({contributeMode});
    localStorage.setItem('contributeMode', contributeMode);
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    let {isLoading, contributeMode} = this.state;
    let {application, cookies, onApplicationChange} = this.props;

    return (
      <div>
        <div style={{color: '#dd2323', marginBottom: 15}}>
          1、仅有老用户持有美团绝版 cookie，新号无法贡献美团了<br />
          2、饿了么 cookie 需要验证手机号之后再贡献<br />
          3、失效的 cookie 验证后想要再贡献，需要先删除<br />
          4、贡献每一个 QQ，需要清除浏览器 cookie 或打开隐身（无痕）模式再登录<br />
          5、一个手机号只能为一个 cookie 验证，重复验证被我们检测将置为失效小号<br />
          6、贡献饿了么星选需要小号经过微信授权且绑定手机号
        </div>
        <Radio.Group onChange={onApplicationChange} value={application} style={{marginBottom: '12px'}}>
          <Radio value={0} disabled>
            美团
          </Radio>
          <Radio value={1}>饿了么</Radio>
          <Radio value={2}>饿了么星选</Radio>
        </Radio.Group>
        {application === 1 && (
          <div>
            <div style={{marginBottom: 5}}>以下两种方式均可贡献饿了么小号：</div>
            <Radio.Group onChange={this.changeContributeMode} value={contributeMode} style={{marginBottom: '12px'}}>
              <Radio value="sid-and-snsInfo">贡献 SID、snsInfo</Radio>
              <Radio value="cookie">贡献完整 cookie</Radio>
            </Radio.Group>
            <ContributeForm onSubmit={this.handleSubmit}>
              {contributeMode === 'sid-and-snsInfo' && (
                <div>
                  <Form.Item>
                    {getFieldDecorator('sid', {
                      rules: [{required: true, message: '请输入要贡献的 cookie SID'}]
                    })(<Input placeholder="请输入要贡献的 cookie SID" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('snsInfo', {
                      rules: [{required: true, message: '请输入要贡献的 cookie snsInfo'}]
                    })(
                      <Input.TextArea placeholder="请输入要贡献的 cookie snsInfo" autosize={{minRows: 8, maxRows: 8}} />
                    )}
                  </Form.Item>
                </div>
              )}
              {contributeMode === 'cookie' && (
                <Form.Item>
                  {getFieldDecorator('cookie', {
                    rules: [{required: true, message: '请输入要贡献的完整 cookie，需同时包含 SID 和 snsInfo'}]
                  })(
                    <Input.TextArea
                      placeholder="请输入要贡献的完整 cookie，需同时包含 SID 和 snsInfo"
                      autosize={{minRows: 10, maxRows: 10}}
                    />
                  )}
                </Form.Item>
              )}
              <Form.Item>
                <Button type="primary" loading={isLoading} htmlType="submit" className="login-form-button">
                  贡献饿了么小号 cookie
                </Button>
              </Form.Item>
            </ContributeForm>
            {cookies.length > 0 && (
              <div>
                <Button.Group style={{marginBottom: 15}}>
                  <Button onClick={() => this.downloadCookies()}>
                    <Icon type="download" theme="outlined" />下载所有失效 cookie
                  </Button>
                  <Popconfirm
                    title="删除后将无法恢复，确定要删除吗？"
                    onConfirm={() => this.deleteCookies()}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="danger">
                      <Icon type="delete" theme="outlined" />删除所有失效 cookie
                    </Button>
                  </Popconfirm>
                </Button.Group>
                <div style={{marginBottom: 15}}>如果下载无反应，请尝试使用 Chrome 或 FireFox 等浏览器</div>
              </div>
            )}
          </div>
        )}
        {application === 2 && (
          <ContributeForm onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('cookie', {
                rules: [{required: true, message: '请输入要贡献的完整 cookie，需同时包含 whid 和 WMID'}]
              })(
                <Input.TextArea
                  placeholder="请输入要贡献的完整 cookie，需同时包含 whid 和 WMID"
                  autosize={{minRows: 10, maxRows: 10}}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" loading={isLoading} htmlType="submit" className="login-form-button">
                贡献饿了么星选小号 cookie
              </Button>
            </Form.Item>
          </ContributeForm>
        )}
        {this.renderTable()}
      </div>
    );
  }

  downloadCookies() {
    const content = this.props.cookies
      .filter(o => o.application === this.props.application && !o.valid)
      .map(o =>
        String(o.value || '')
          .trim()
          .replace(/\n/g, '')
      )
      .filter(o => o)
      .join('\n');

    // 创建隐藏的可下载链接
    const link = document.createElement('a');
    link.download = 'cookies.txt';
    link.style.display = 'none';
    // 字符内容转变成blob地址
    const blob = new Blob([content]);
    link.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(link);
    link.click();
    // 然后移除
    document.body.removeChild(link);
  }

  deleteCookies() {
    axios.delete(apis.deleteCookie).then(data => {
      if (data.code === 0) {
        // message.success('删除成功');
        window.location.reload();
      } else {
        message.error(data.message);
      }
    });
  }

  renderTable() {
    let cookies = this.props.cookies
      .filter(o => o.application === this.props.application)
      .sort((a, b) => b.gmtCreate - a.gmtCreate);

    let onConfirm = record => this.deleteCookie(record.id);

    let renderHeadImg = (url, record) => (url ? <img src={url} width="50" height="50" alt="头像" /> : '无');

    let renderTime = (time, record) => (
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        <p>{time}</p>
        <p>
          {!record.valid && <span style={{color: '#dd2323'}}>[已失效]&nbsp;</span>}
          {record.nickname}
        </p>
      </div>
    );

    let renderDeleteBtn = (text, record) => (
      <Popconfirm
        title={record.valid ? '确定要删除吗？' : '删除将扣除 5 次消耗，确定要删除吗？'}
        onConfirm={e => onConfirm(record)}
        okText="确定"
        cancelText="取消"
      >
        <Button size="small">删除</Button>
      </Popconfirm>
    );

    const columns = [
      {
        title: '头像',
        dataIndex: 'headImgUrl',
        key: 'headImgUrl',
        width: 60,
        render: renderHeadImg
      },
      {
        title: '贡献时间、昵称',
        dataIndex: 'time',
        key: 'time',
        render: renderTime
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: 60,
        render: renderDeleteBtn
      }
    ];

    return (
      <Table
        dataSource={cookies}
        columns={columns}
        pagination={{
          pageSize: 5,
          size: 'small',
          total: cookies.length
        }}
      />
    );
  }

  deleteCookie = id => {
    axios.delete(`${apis.deleteCookie}/${id}`).then(data => {
      if (data.code === 0) {
        this.props.deleteCookieCallback(id);
        message.success('删除成功');
      } else {
        message.error(data.message);
      }
    });
  };
}

export default Form.create()(Contribute);
