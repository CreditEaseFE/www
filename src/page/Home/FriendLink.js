import React from "react";
import { Icon } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  border-top: 1px dashed #ccc;
  padding: 15px 0;
`;

const Item = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})`
  :after {
    content: " ";
    color: rgba(0, 0, 0, 0.5);
    padding: 0 5px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const links = [
  {
    href: "http://wpa.qq.com/msgrd?v=3&uin=397909414&site=qq&menu=yes",
    text: "联系管理员"
  }
];

export default () => (
  <Wrapper>
    <Icon type="usergroup-add" />
    &nbsp;{" "}
    {links.map(link => (
      <Item href={link.href}>{link.text}</Item>
    ))}
  </Wrapper>
);
