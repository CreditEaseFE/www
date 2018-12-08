import React, { useState, useEffect, useRef } from "react";
import { Button, message, Icon, Select, Modal } from "antd";
import Clipboard from "clipboard";
import styled from "styled-components";
import isWeixin from "is-weixin";
import { apis, axios, qs } from "../../api";

const Container = styled.div`
  position: relative;
  background: #fff;
  display: inline-block;
  z-index: 100;
`;

const Image = styled.div`
  position: absolute;
  left: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  display: none;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);

  div {
    text-align: center;
    padding: 10px 10px 0;
  }
`;

const RmbButton = styled(({ hookRef, ...rest }) => (
  <Button ref={hookRef} {...rest} />
))`
  &:hover ${Image} {
    display: block;
  }
`;

export default ({ user }) => {
  const copyCode = useRef();
  const [ka, setKa] = useState(false);
  const [card, setCard] = useState("");
  const [application, setApplication] = useState(0);
  const [qrcode, setQrcode] = useState("");
  const [loading, setLoading] = useState(false);
  const cardName = card === "month" ? "月卡" : "周卡";
  const weixin = isWeixin(navigator.userAgent);

  const wxPay = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { data, message: message2 } = await axios.post(
        apis.createPay,
        qs.stringify({
          type: weixin ? "cashier" : "native",
          user_id: user.id,
          application,
          card
        })
      );
      if (message2) {
        return message.error(message2);
      }
      if (weixin) {
        window.location.href = data;
      } else {
        setQrcode(data);
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      const clipboard = new Clipboard(copyCode.current.buttonNode, {
        text: () => "aRhixt096d"
      });
      clipboard.on("success", e => {
        e.clearSelection();
        message.info(
          "打开支付宝即可领取红包（每天可以领一次）红包码：aRhixt096d"
        );
      });
      clipboard.on("error", () => {
        if (
          window.confirm("您的设备不支持复制红包码，是否跳转到支付宝领取？")
        ) {
          window.location.href =
            "https://qr.alipay.com/c1x06611gnoczzqiklpka04";
        }
      });
    },
    [copyCode]
  );

  return (
    <Container>
      <Button.Group style={{ marginBottom: 5, marginRight: 5 }}>
        <RmbButton
          type="primary"
          onClick={() => message.info("如果本站对您有帮助，欢迎打赏支持我们")}
        >
          <Icon type="pay-circle" />
          打赏
          <Image>
            <table>
              <tr style={{ color: "#222" }}>
                <th>支付宝</th>
                <th>微信</th>
              </tr>
              <tr>
                <td>
                  <img
                    src={require("../../static/zfb.png")}
                    width="190"
                    alt="打赏 支付宝支付"
                  />
                </td>
                <td>
                  <img
                    src={require("../../static/wx.png")}
                    width="190"
                    alt="打赏 微信支付"
                  />
                </td>
              </tr>
            </table>
          </Image>
        </RmbButton>
        <RmbButton type="primary" hookRef={copyCode}>
          <Icon type="alipay-circle" />
          红包
          <Image>
            <img
              src={require("../../static/hongbao1.jpg")}
              width="290"
              alt="支付宝 每天领红包"
            />
          </Image>
        </RmbButton>
      </Button.Group>
      <Button.Group>
        <RmbButton
          type="danger"
          onClick={() => {
            setKa(true);
            setCard("week");
          }}
        >
          付费周卡
        </RmbButton>
        <RmbButton
          type="danger"
          onClick={() => {
            setKa(true);
            setCard("month");
          }}
        >
          付费月卡
        </RmbButton>
      </Button.Group>
      <Modal
        title={`${card === "month" ? "18.88" : "8.88"}元 付费${cardName}(${
          card === "month" ? 30 : 7
        }天)`}
        visible={ka}
        confirmLoading={loading}
        onOk={wxPay}
        okText="微信支付"
        onCancel={() => {
          setKa(false);
          setQrcode(null);
        }}
        cancelText="取消"
      >
        <div>
          <span>选择：</span>
          <Select
            defaultValue={application}
            style={{ marginBottom: "20px" }}
            onSelect={application => {
              setApplication(application);
              setQrcode(null);
            }}
          >
            <Select.Option value={0}>美团{cardName}-每天获得20次</Select.Option>
            <Select.Option value={1} disabled>
              饿了么{cardName}-暂不支持付费
            </Select.Option>
            <Select.Option value={2} disabled>
              星选{cardName}-暂不支持付费
            </Select.Option>
          </Select>
        </div>
        <ul>
          <li>可叠加购买多次，独立计算{cardName}时间</li>
          <li>次数不累积到第二天，建议领到最大前一个囤包</li>
          <li>付款后刷新页面查看次数，1分钟内生效</li>
          <li style={{ color: "#dd2323" }}>
            不支持退款，包括但不限于饿了么、美团和谐等因素
          </li>
        </ul>
        {qrcode && (
          <div style={{ textAlign: "center" }}>
            <br />
            <img src={qrcode} width={200} height={200} alt="微信付款码" />
            <p style={{ marginTop: 10 }}>
              使用微信扫一扫付款
              <br />
              或者在微信环境中打开本站
            </p>
          </div>
        )}
      </Modal>
    </Container>
  );
};
