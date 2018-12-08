import React, { useRef, useEffect, useState } from "react";
import { message } from "antd";
import QRCode from "qrcode.react";
import Clipboard from "clipboard";

export default () => {
  const copyToken = useRef();
  const [token] = useState(localStorage.getItem("token"));

  useEffect(
    () => {
      const clipboard = new Clipboard(copyToken.current, {
        text: () => token
      });
      clipboard.on("success", e => {
        e.clearSelection();
        message.success(
          "token 复制成功，请打开 “一键最佳” 小程序 或 发送到公众号"
        );
      });
      clipboard.on("error", () => {
        message.error("您的设备不支持复制，请使用扫码方式");
      });
    },
    [copyToken]
  );

  return (
    <div style={{ textAlign: "center" }}>
      <p>暂时只有订阅号，如遇问题请在网页版看领取结果</p>
      <img
        width={200}
        src={require("../../static/gongzhonghao.jpg")}
        alt="订阅号码"
      />
      <p>使用微信扫描小程序码，或搜索小程序“一键最佳”</p>
      <img
        width={200}
        src={require("../../static/miniprogram.jpg")}
        alt="小程序码"
      />
      <p />
      <p>
        进入之后，点击小程序内任意位置，会调起扫码功能
        <br />
        扫描以下二维码将自动登录您的账号
      </p>
      <p style={{ color: "#dd2323" }}>请注意不要泄露你的二维码和 token</p>
      <QRCode size={200} value={token} />
      <p />
      <p ref={copyToken} style={{ color: "#1890ff", cursor: "pointer" }}>
        不方便扫码可以点击这里复制 token 再进入小程序
      </p>
      <p>只需要操作一次，下次可直接从微信中进入</p>
    </div>
  );
};
