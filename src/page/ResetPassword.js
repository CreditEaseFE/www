import React from "react";
import { browserHistory } from "react-router";
import { Form, Input, Button, message } from "antd";
import Domain from "../component/Domain";
import { axios, apis, qs } from "../api";

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      passwordError: false,
      passwordErrorHelp: "",

      repeatPwd: "",
      repeatPwdError: false,
      repeatPwdErrorHelp: ""
    };
  }

  resetPassword = data => {
    if (this.state.passwordError || this.state.repeatPwdError) return;

    data.verificationCode = this.props.location.query.verificationCode;

    axios
      .post(apis.resetPassword, qs.stringify(data))
      .then(data => {
        if (data.code === 0) {
          message.success("重置成功");
          browserHistory.push("/");
        } else {
          message.error(data.message);
        }
      })
      .catch(err => message.error(err.message));
  };

  handleSubmit = e => {
    e.preventDefault();
    let { password, repeatPwd } = this.state;

    if (this.validatePassword(password) && this.validateRepeatPwd(repeatPwd)) {
      this.resetPassword({ password });
    }
  };

  validatePassword = password => {
    if (!password) {
      this.setState({
        passwordError: true,
        passwordErrorHelp: "请输入密码"
      });
    } else if (password.length < 4 || password.length > 16) {
      this.setState({
        passwordError: true,
        passwordErrorHelp: "密码长度在6-16位之间"
      });
      return false;
    } else {
      this.setState({
        passwordError: false,
        passwordErrorHelp: "",
        password
      });
      return true;
    }
  };

  validateRepeatPwd = repeatPwd => {
    let { password } = this.state;

    if (repeatPwd !== password) {
      this.setState({
        repeatPwdError: true,
        repeatPwdErrorHelp: "两次输入的密码不一致"
      });
      return false;
    } else {
      this.setState({ repeatPwdError: false, repeatPwdErrorHelp: "" });
      return true;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let {
      passwordError,
      passwordErrorHelp,
      repeatPwdError,
      repeatPwdErrorHelp
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          <h2>
            重置密码<Domain />
          </h2>
        </Form.Item>
        <Form.Item
          key={2}
          validateStatus={passwordError ? "error" : ""}
          help={passwordErrorHelp}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码" }]
          })(
            <Input
              onChange={e => this.setState({ password: e.target.value })}
              type={"password"}
              placeholder="请输入密码"
            />
          )}
        </Form.Item>
        <Form.Item
          key={3}
          validateStatus={repeatPwdError ? "error" : ""}
          help={repeatPwdErrorHelp}
        >
          {getFieldDecorator("repeatPwd", {
            rules: [{ required: true, message: "请输入密码" }]
          })(
            <Input
              onChange={e => this.setState({ repeatPwd: e.target.value })}
              type={"password"}
              placeholder="请确认密码"
            />
          )}
        </Form.Item>
        <Form.Item key={4}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ResetPassword);
