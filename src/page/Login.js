import React, { useEffect, useState } from "react";
import { Form, Input, Button, Breadcrumb, message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { axios, apis, qs, login } from "../api";
import Notice from "../component/Notice";

const Login = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = form;

  const doLogin = async params => {
    try {
      setLoading(true);
      const data = await axios.post(apis.login, qs.stringify(params));
      if (data.code === 0) {
        login(data.data.token);
      } else {
        message.error(data.message);
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        await doLogin(values);
      }
    });
  };

  useEffect(() => {
    document.body.classList.remove("is-home");
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        <h2>登录</h2>
        <span style={{ color: "#aaa" }}>每天大红包 · 一键领取手气最佳红包</span>
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("account", {
          rules: [{ required: true, message: "请输入帐号" }]
        })(<Input placeholder="请输入帐号" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "请输入密码" }]
        })(<Input type="password" placeholder="请输入密码" />)}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          登录
        </Button>
        <Link to="/apply" style={{ marginLeft: "12px" }}>
          还没有帐号，马上注册
        </Link>
      </Form.Item>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link
            to="/applyResetPassword"
            style={{
              display: "inline-block",
              margin: "12px 0"
            }}
          >
            重置密码
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            href="https://github.com/mtdhb/mtdhb/issues"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              margin: "12px 0"
            }}
          >
            反馈问题
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Notice />
    </Form>
  );
};

export default withRouter(Form.create()(Login));
