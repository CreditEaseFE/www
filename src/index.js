import React from "react";
import { render } from "react-dom";
import { message } from "antd";
import App from "./App";
import { register } from "./serviceWorker";
import NewVersion from "./component/NewVersion";

render(<App />, document.getElementById("root"));

register({
  onUpdate() {
    message.info(NewVersion(), 0);
  }
});
