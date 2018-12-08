import React, { useState } from "react";
import hex2dec from "hex2dec";
import {
  Button,
  Collapse,
  Form,
  Input,
  Table,
  Checkbox,
  Tooltip,
  message,
  Icon
} from "antd";
import { axios, apis, qs } from "../../api";
import moment from "moment";

const GetHongbao = ({ form, callback, historyList }) => {
  const [mobile, setMobile] = useState(localStorage.getItem("mobile") || "");
  const [getting, setGetting] = useState(false);
  const { getFieldDecorator } = form;

  const getHongbao = async params => {
    try {
      setGetting(true);
      setMobile(params.phone);
      localStorage.setItem("mobile", params.phone);
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
        callback(data.data);
      } else {
        message.error(data.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGetting(false);
      form.resetFields(["url"]);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (getting) {
      return;
    }
    form.validateFields(async (err, values) => {
      if (!err) {
        await getHongbao(values);
      }
    });
  };

  const renderDescription = () => {
    return (
      <Collapse defaultActiveKey={["1", "2", "3"]} bordered={false}>
        <Collapse.Panel header="红包链接说明" key="1" style={{ border: 0 }}>
          1. 饿了么红包：https://h5.ele.me/hongbao/ 开头的链接。
          <br />
          2. 美团红包：https://activity.waimai.meituan.com/coupon/ 开头的链接。
          <br />
          3. 饿了么星选红包：https://star.ele.me/hongbao/wpshare 开头的链接。
          <br />
          4. 短链接：https://url.cn/ 开头的链接。
        </Collapse.Panel>
        <Collapse.Panel header="如何获取拼手气红包？" key="2">
          1. 好友下单后，分享到群里的红包。
          <br />
          2. 饿了么 APP 买过的订单点进去，分享红包。
        </Collapse.Panel>
        <Collapse.Panel header="如何复制红包链接？" key="3">
          1. 分享到 QQ，选择 “我的电脑”，PC 版 QQ 复制链接。
          <br />
          2. 分享到微信，PC 版微信右键用浏览器打开，复制链接。
          <br />
          3. 长按微信分享的卡片 - 点击更多 - 发送邮件 -
          复制链接（如果看不到链接，在微信的设置 - 通用 - 功能 -
          开启邮箱提醒）。
          <br />
          4. 饿了么 APP 买过的订单点进去，复制订单号。
        </Collapse.Panel>
      </Collapse>
    );
  };

  const renderHistoryTable = () => {
    const columns = [
      {
        title: "领取时间",
        dataIndex: "time",
        key: "time",
        width: 60,
        render: text => {
          const [a, b] = text.split(" ");
          return (
            <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
              {a}
              <br />
              {b}
            </div>
          );
        }
      },
      {
        title: "金额(元)",
        dataIndex: "price",
        key: "price",
        width: 60,
        render: (price, r) => <div style={{ textAlign: "center" }}>{price}</div>
      },
      {
        title: "状态",
        dataIndex: "message",
        key: "message",
        render: (text, r) => {
          const color = { 0: "", 1: "#5bab60", 2: "#dd2323" }[
            !r.phone && /已领取到最佳前一个红包/.test(r.message) ? 1 : r.status
          ];
          let elemeType = "";
          if (r.application === 1 && r.type !== null) {
            elemeType = ["拼手气", "品质联盟"][r.type] || "";
          } else if (r.application === 2) {
            elemeType = "星选";
          }
          elemeType = elemeType ? `-${elemeType}` : "";
          return (
            <div>
              <div style={{ whiteSpace: "nowrap" }}>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  [{r.application === 0 ? "美" : `饿${elemeType}`}]
                </a>{" "}
                <span>{r.phone || "未填手机号"}</span>
              </div>
              <div style={{ color }}>{text}</div>
            </div>
          );
        }
      }
    ];

    historyList.forEach((item, index) => {
      item.time = moment(new Date(item.gmtModified || item.gmtCreate)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      if (item.status === 1) {
        item.message = `领取成功（${
          item.price >= 10 ? "卧槽！今天可以加餐了" : "请以实际到账金额为准"
        }）`;
        item.price = item.price <= 0 ? "未知" : item.price;
      } else if (item.status === 0) {
        item.message = `正在领取...`;
      } else if (item.status === 2) {
        item.price = 0;
      }
      item.key = index;
    });

    return (
      <Table dataSource={historyList} columns={columns} pagination={false} />
    );
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <div style={{ color: "#dd2323", paddingBottom: "10px" }}>
        1、请先仔细阅读规则再来领取，以免浪费次数
        <br />
        2、领取饿了么时会忽略填写的手机号码，只领到最大前一个
        <br />
        3、部分饿了么红包无法获取第几个最大了，所以请尽量保证填写的链接没有瞎改
        lucky_number，否则可能会领错
      </div>
      <Form.Item>
        {getFieldDecorator("phone", {
          rules: [
            {
              required: false,
              message: "领红包的手机号码（留空可领到最大前一个）"
            }
          ],
          initialValue: mobile
        })(
          <Input
            placeholder="领红包的手机号码（留空可领到最大前一个）"
            maxLength={11}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("url", {
          rules: [
            {
              required: true,
              message:
                "请输入美团、饿了么拼手气红包链接。饿了么除了可以输入链接，也支持订单号或者sn提交"
            }
          ]
        })(
          <Input.TextArea
            placeholder="请输入美团、饿了么拼手气红包链接。饿了么除了可以输入链接，也支持订单号或者sn提交（不知道怎么复制链接？请到页面底部查看方法）"
            autosize={{ minRows: 8, maxRows: 8 }}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("force", {
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
        <Button
          type="primary"
          disabled={getting}
          htmlType="submit"
          className="login-form-button"
        >
          领取手气最佳红包
        </Button>
        {getting && (
          <span style={{ color: "#dd2323", marginLeft: "12px" }}>
            请等待上一个红包领取完成
          </span>
        )}
      </Form.Item>
      <p style={{ color: "#dd2323" }}>最近 10 次领取记录：</p>
      {renderHistoryTable()}
      {renderDescription()}
    </Form>
  );
};

export default Form.create()(GetHongbao);
