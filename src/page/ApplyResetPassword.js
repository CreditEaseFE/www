import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { axios, apis, qs } from "../api";

const ApplyResetPassword = () => {
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState(false);
  const [mailErrorHelp, setMailErrorHelp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaErrorHelp, setCaptchaErrorHelp] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeCaptcha = () => {
    setCaptchaImage(apis.getCaptcha + "?" + new Date().getTime());
  };

  const resetPasswordMail = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        apis.resetPasswordMail,
        qs.stringify({ mail, captcha })
      );
      if (data.code === 0) {
        setFinished(true);
      } else {
        if ([10004, 10018].includes(data.code)) {
          setMail("");
        }
        setFinished(false);
        message.error(data.message);
      }
      setCaptcha("");
    } catch (e) {
      message.error(e.message);
    } finally {
      changeCaptcha();
      setLoading(false);
    }
  };

  const validateMail = () => {
    if (
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
        mail
      )
    ) {
      setMailError(false);
      setMailErrorHelp("");
      return true;
    }
    setMailError(true);
    setMailErrorHelp(mail ? "邮箱格式不正确" : "请输入邮箱");
    return false;
  };

  const validateCaptcha = () => {
    if (captcha.length === 4) {
      setCaptchaError(false);
      setCaptchaErrorHelp("");
      return true;
    }
    setCaptchaError(true);
    setCaptchaErrorHelp("验证码只能是4位字符");
    return false;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (validateMail() && validateCaptcha()) {
      await resetPasswordMail();
    }
  };

  useEffect(() => {
    document.body.classList.remove("is-home");
    changeCaptcha();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        <h2>申请重置密码</h2>
      </Form.Item>
      <Form.Item
        key={0}
        validateStatus={mailError ? "error" : ""}
        help={mailErrorHelp}
      >
        <Input
          name="mail"
          value={mail}
          placeholder="请输入邮箱"
          onChange={event => setMail(event.target.value)}
        />
      </Form.Item>
      <Form.Item
        key={1}
        validateStatus={captchaError ? "error" : ""}
        help={captchaErrorHelp}
      >
        <Input
          name="captcha"
          value={captcha}
          placeholder="请输入验证码"
          onChange={event => setCaptcha(event.target.value)}
          style={{ width: "185px" }}
        />
        {captchaImage && (
          <img
            id="captchaCode"
            src={captchaImage}
            onClick={changeCaptcha}
            style={{ marginTop: "-1px", cursor: "pointer" }}
            alt="验证码"
          />
        )}
      </Form.Item>
      <Form.Item key={2}>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          className="login-form-button"
        >
          申请重置密码
        </Button>
      </Form.Item>
      {finished ? (
        <div style={{ fontSize: "16px", color: "#dd2323" }}>
          邮件已发送，请点击链接重新设置密码！若长时间未收到邮件，请重新申请。
        </div>
      ) : (
        ""
      )}
    </Form>
  );
};

export default withRouter(Form.create()(ApplyResetPassword));
