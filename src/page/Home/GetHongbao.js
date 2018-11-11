import React from 'react';
import hex2dec from 'hex2dec';
import {Button, Collapse, Form, Input, Table, Checkbox, Tooltip, message, Icon} from 'antd';
import {axios, apis, qs} from '../../api';
import moment from 'moment';

class GetHongbao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: localStorage.getItem('mobile') || '',
      // 正在领取中
      isGetting: false
    };
  }

  getHongbao = async params => {
    try {
      params.force = params.force ? 1 : 0;
      // 19位数字可能是订单号，转成16进制就是sn
      if (/^[0-9]{19}$/.test(params.url)) {
        params.url = hex2dec.decToHex(params.url, {
          prefix: false
        });
      }
      // 16位可能是sn，手动拼一下
      if (/^[0-9a-z]{16}$/i.test(params.url)) {
        params.url = `https://h5.ele.me/hongbao/#sn=${params.url}`;
      }
      const data = await axios.post(apis.getHongbao, qs.stringify(params));
      if (data.code === 0) {
        this.props.callback(data.data);
      } else {
        message.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({isGetting: false});
    this.props.form.resetFields(['url']);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isGetting) return;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getHongbao(values);
        this.setState({mobile: values.phone, isGetting: true});
        localStorage.setItem('mobile', values.phone);
      }
    });
  };

  renderHistoryTable = e => {
    let renderGmtCreate = text => {
      let temp = text.split(' ');
      return (
        <div style={{textAlign: 'center', whiteSpace: 'nowrap'}}>
          {temp[0]}
          <br />
          {temp[1]}
        </div>
      );
    };

    let renderStatus = (text, r) => {
      let color = {0: '', 1: '#5bab60', 2: '#dd2323'}[
        !r.phone && /已领取到最佳前一个红包/.test(r.message) ? 1 : r.status
      ];
      let elemeType = '';
      if (r.application === 1 && r.type !== null) {
        elemeType = ['拼手气', '品质联盟'][r.type] || '';
      } else if (r.application === 2) {
        elemeType = '星选';
      }
      elemeType = elemeType ? `-${elemeType}` : '';
      return (
        <div>
          <div style={{whiteSpace: 'nowrap'}}>
            <a href={r.url} target="_blank">
              [{r.application === 0 ? '美' : `饿${elemeType}`}]
            </a>{' '}
            <span>{r.phone || '未填手机号'}</span>
          </div>
          <div style={{color}}>{text}</div>
        </div>
      );
    };

    let renderPrice = (price, r) => {
      return <div style={{textAlign: 'center'}}>{price}</div>;
    };

    const columns = [
      {
        title: '领取时间',
        dataIndex: 'time',
        key: 'time',
        width: 60,
        render: renderGmtCreate
      },
      {
        title: '金额(元)',
        dataIndex: 'price',
        key: 'price',
        width: 60,
        render: renderPrice
      },
      {
        title: '状态',
        dataIndex: 'message',
        key: 'message',
        render: renderStatus
      }
    ];

    let {historyList} = this.props;

    historyList.forEach((o, i) => {
      o.time = moment(new Date(o.gmtModified || o.gmtCreate)).format('YYYY-MM-DD HH:mm:ss');
      if (o.status === 1) {
        o.message = `领取成功（${o.price >= 10 ? '卧槽！今天可以加餐了' : '请以实际到账金额为准'}）`;
        o.price = o.price <= 0 ? '未知' : o.price;
      } else if (o.status === 0) {
        o.message = `正在领取...`;
      } else if (o.status === 2) {
        o.price = 0;
      }
      o.key = i;
    });

    return <Table dataSource={this.props.historyList} columns={columns} pagination={false} />;
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    let {isGetting} = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div style={{color: '#dd2323', paddingBottom: '10px'}}>
          1、请先仔细阅读规则再来领取，以免浪费次数<br />
          2、领取饿了么时会忽略填写的手机号码，只领到最大前一个<br />
          3、部分饿了么红包无法获取第几个最大了，所以请尽量保证填写的链接没有瞎改 lucky_number，否则可能会领错
        </div>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: false,
                message: '领红包的手机号码（留空可领到最大前一个）'
              }
            ],
            initialValue: this.state.mobile
          })(<Input placeholder="领红包的手机号码（留空可领到最大前一个）" maxLength={11} />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: '请输入美团、饿了么拼手气红包链接。饿了么除了可以输入链接，也支持订单号或者sn提交'
              }
            ]
          })(
            <Input.TextArea
              placeholder="请输入美团、饿了么拼手气红包链接。饿了么除了可以输入链接，也支持订单号或者sn提交（不知道怎么复制链接？请到页面底部查看方法）"
              autosize={{minRows: 8, maxRows: 8}}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('force', {
            rules: [
              {
                required: false
              }
            ],
            initialValue: false
          })(
            <Checkbox>
              强制领取（勾选将不检查该链接是否被领过）
              <Tooltip title="如果你填写的链接最大包还没出现，而本站又提示该红包被领过时，你可以尝试勾选此项再点领取。如果你不知道何时勾选此项，那说明你不需要，请勿勾选有利于节省你的次数。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" disabled={isGetting} htmlType="submit" className="login-form-button">
            领取手气最佳红包
          </Button>
          {isGetting && <span style={{color: '#dd2323', marginLeft: '12px'}}>请等待上一个红包领取完成</span>}
        </Form.Item>
        <ul>
          <li>
            <a
              href="https://note.youdao.com/share/?id=1a6addb66a43c56de86c26d1fa52aaa3&type=note#/"
              target="_blank"
              rel="noopener noreferrer"
            >
              [教程] 饿了么双红包叠加下单
            </a>
          </li>
        </ul>
        <p style={{color: '#dd2323'}}>最近 10 次领取记录：</p>
        {this.renderHistoryTable()}
        {this.renderDescription()}
      </Form>
    );
  }

  renderDescription = e => {
    return (
      <div>
        <Collapse defaultActiveKey={['1', '2', '3']} bordered={false}>
          <Collapse.Panel header="红包链接说明" key="1" style={{border: 0}}>
            1. 饿了么红包：https://h5.ele.me/hongbao/ 开头的链接。<br />
            2. 美团红包：https://activity.waimai.meituan.com/coupon/ 开头的链接。<br />
            3. 饿了么星选红包：https://star.ele.me/hongbao/wpshare 开头的链接。<br />
            4. 短链接：https://url.cn/ 开头的链接。
          </Collapse.Panel>
          <Collapse.Panel header="如何获取拼手气红包？" key="2">
            1. 好友下单后，分享到群里的红包。<br />
            2. 饿了么 APP 买过的订单点进去，分享红包。
          </Collapse.Panel>
          <Collapse.Panel header="如何复制红包链接？" key="3">
            1. 分享到 QQ，选择 “我的电脑”，PC 版 QQ 复制链接。<br />
            2. 分享到微信，PC 版微信右键用浏览器打开，复制链接。<br />
            3. 长按微信分享的卡片 - 点击更多 - 发送邮件 - 复制链接（如果看不到链接，在微信的设置 - 通用 - 功能 -
            开启邮箱提醒）。<br />
            4. 饿了么 APP 买过的订单点进去，复制订单号。
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  };
}

export default Form.create()(GetHongbao);
