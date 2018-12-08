import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { axios, apis, qs } from "../api";

const Apply = () => {
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState(false);
  const [mailErrorHelp, setMailErrorHelp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaErrorHelp, setCaptchaErrorHelp] = useState("");
  const [applyFinished, setApplyFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeCaptcha = () => {
    setCaptchaImage(apis.getCaptcha + "?" + new Date().getTime());
  };

  const getRegisterCode = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        apis.getRegisterCode,
        qs.stringify({ mail, captcha })
      );
      if (data.code === 0) {
        setApplyFinished(true);
      } else {
        if (data.code === 10004) {
          setMail("");
        }
        setApplyFinished(false);
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
      await getRegisterCode();
    }
  };

  useEffect(changeCaptcha, []);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        <h2>申请帐号</h2>
        <span style={{ color: "#aaa" }}>每天大红包 · 一键领取手气最佳红包</span>
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
          申请
        </Button>
        <Link to="/login" style={{ marginLeft: "12px" }}>
          已有帐号？立即登录
        </Link>
      </Form.Item>
      <a
        href="https://github.com/mtdhb/mtdhb/issues"
        target="_blank"
        style={{ display: "inline-block", margin: "12px 0" }}
        rel="noopener noreferrer"
      >
        有问题要反馈？点这里
      </a>
      {applyFinished ? (
        <div style={{ fontSize: "16px", color: "#dd2323" }}>
          邮件已发送，请点击链接完成注册！若长时间未收到邮件，请重新申请。
        </div>
      ) : (
        ""
      )}
    </Form>
  );
};

export default withRouter(Form.create()(Apply));
