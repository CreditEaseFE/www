import React, { Fragment } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { BackTop } from "antd";
import history from "./history";
import "./globalStyle";
import "./hmt";
import Mouse from "./component/Mouse";
import Loadable from "./component/Loadable";

export default () => (
  <Fragment>
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          component={Loadable(() => import("./page/Home"))}
        />
        <Route
          path="/apply"
          component={Loadable(() => import("./page/Apply"))}
        />
        <Route
          path="/login"
          component={Loadable(() => import("./page/Login"))}
        />
        <Route
          path="/register"
          component={Loadable(() => import("./page/Register"))}
        />
        <Route
          path="/applyResetPassword"
          component={Loadable(() => import("./page/ApplyResetPassword"))}
        />
        <Route
          path="/resetPassword"
          component={Loadable(() => import("./page/ResetPassword"))}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
    <BackTop />
    <Mouse />
  </Fragment>
);
