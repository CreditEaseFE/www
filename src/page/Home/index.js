import React from "react";
import { Alert, Breadcrumb, Tabs, message, Carousel, Skeleton } from "antd";
import styled from "styled-components";
import moment from "moment";
import { axios, apis, logout } from "../../api";
import Pay from "./Pay";
import Notice from "../../component/Notice";
import Loadable from "../../component/Loadable";
import Media from "../../component/Media";
import GetHongbao from "./GetHongbao";
import Contribute from "./Contribute";
import FriendLink from "./FriendLink";
import Rules from "./Rules";
import Rank from "./Rank";
import Statistics from "./Statistics";
import JoinGroup from "./JoinGroup";
import MiniProgram from "./MiniProgram";
import { browserHistory } from "react-router";
const Talk = Loadable(() => import("../../component/Talk"));

const Container = styled.div`
  display: flex;
  justify-content: center;

  ${Media.mobile`display: block;`};
`;

const Column = styled.div`
  position: relative;
  width: 480px;

  &:first-child {
    margin-right: 20px;
  }

  ${Media.mobile`width: 100%;`};
`;

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      cookies: [],
      payList: [],
      noticeList: [],
      number: {
        ele: {
          available: 0,
          total: 0
        },
        meituan: {
          available: 0,
          total: 0
        }
      },
      historyList: [],
      createTime: 15,
      tab: localStorage.getItem("tab") || "1",
      application: parseInt(localStorage.getItem("application") || 1, 10),
      carouselRecords: [],
      rankData: {},
      trendData: {},
      pieData: {
        ele: [],
        meituan: []
      }
    };
    document.body.classList.add("is-home");
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.callApiByTab();
      this.getUserInfo();
      this.getAvailableCount();
      this.zhuangbi();
    } else {
      logout();
    }
  }

  render() {
    const {
      application,
      historyList,
      tab,
      cookies,
      rankData,
      trendData,
      pieData,
      user
    } = this.state;
    return (
      <Container>
        <Column>
          {this.renderCarousel()}
          {this.renderHello()}
          {this.renderBreadcrumb()}
          <Pay user={user} />
          {this.renderAvailable()}
          <Notice />
          <Talk />
        </Column>
        <Column>
          <Tabs defaultActiveKey={tab} onChange={this.onTabChange}>
            <Tabs.TabPane tab="规则" key="rule">
              <Rules />
            </Tabs.TabPane>
            <Tabs.TabPane tab="领取" key="getHongbao">
              <GetHongbao
                historyList={historyList}
                callback={this.getHongbaoCallback}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="贡献" key="contribute">
              <Contribute
                contributeCallback={this.contributeCallback}
                onApplicationChange={this.onApplicationChange}
                application={application}
                cookies={cookies}
                deleteCookieCallback={this.deleteCookieCallback}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="排行" key="rank">
              <Rank data={rankData} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="统计" key="statistics">
              <Statistics data={trendData} pieData={pieData} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="公众号/小程序" key="mp">
              <MiniProgram />
            </Tabs.TabPane>
            <Tabs.TabPane tab="加群" key="joinGroup">
              <JoinGroup />
            </Tabs.TabPane>
          </Tabs>
          <FriendLink />
        </Column>
      </Container>
    );
  }

  renderCarousel() {
    const { carouselRecords = [] } = this.state;
    const style = {
      color: "#5bab60",
      fontSize: "16px",
      whiteSpace: "nowrap"
    };

    return (
      <div style={{ height: "30px", overflow: "hidden" }}>
        {carouselRecords.length ? (
          <Carousel vertical autoplay>
            {carouselRecords.map((o, i) => (
              <div key={i}>
                <div style={style}>
                  {o.mail} 在{" "}
                  {moment(new Date(o.gmtModified)).format("HH:mm:ss")} 领到
                  <span style={{ color: "#dd2323" }}>
                    &nbsp;{o.price}&nbsp;
                  </span>
                  元{o.application === 0 ? "美团" : "饿了么"}大红包
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <div style={{ ...style, marginTop: -10, width: 360 / 0.38 }}>
            <Skeleton active />
          </div>
        )}
      </div>
    );
  }

  deleteCookieCallback = id => {
    //前端删除
    let cookies = this.state.cookies.filter(o => o.id !== id);
    this.setState({ cookies });
    //刷新
    this.getAvailableCount();
  };

  getTrend = e => {
    axios
      .get(apis.getTrend)
      .then(data => this.setState({ trendData: data.data }));
  };

  async getRank() {
    const [rank, payRank] = await Promise.all([
      axios.get(apis.getRank),
      axios.get(apis.getPayRank)
    ]);
    rank.data.pay = payRank.data;
    this.setState({ rankData: rank.data });
  }

  async getUserInfo() {
    const user = await axios.get(apis.getUser);
    if (user.code !== 0) {
      return message.error(user.message);
    }
    this.setState({ user: user.data });
    const payList = await axios.get(`${apis.getPayList}/${this.state.user.id}`);
    this.setState({ payList: payList.data });
  }

  getCookieList = e => {
    axios.get(apis.cookie).then(data => {
      if (data.code === 0) {
        let cookies = data.data;
        cookies.forEach((c, i) => {
          c.time = moment(new Date(c.gmtCreate)).format("YYYY-MM-DD HH:mm:ss");
          c.key = i;
          c.nickname = `[ID:${c.id}] ${c.nickname || "无昵称"}`;
        });
        this.setState({ cookies });
      } else {
        message.error(data.message);
      }
    });
  };

  getAvailableCount = e => {
    axios
      .get(apis.getAvailableCount)
      .then(data => this.setState({ number: data.data }));
  };

  getHongbaoHistory = e => {
    axios
      .get(apis.getHongbaoHistory)
      .then(data => this.setState({ historyList: data.data }));
  };

  refresh = id => {
    axios.get(`${apis.refresh}/${id}`).then(res => {
      const { data } = res;
      if (data.status === 0) {
        setTimeout(() => this.refresh(id), 1000);
      } else {
        const { historyList } = this.state;
        historyList[0] = data;
        this.setState({ historyList });
        this.getAvailableCount();
      }
    });
  };

  zhuangbi = e => {
    axios
      .get(apis.zhuangbi)
      .then(res => this.setState({ carouselRecords: res.data }));
  };

  getPie = e => {
    axios.get(apis.getPie).then(res => this.setState({ pieData: res.data }));
  };

  onTabChange = tab => {
    this.callApiByTab(tab);
    localStorage.setItem("tab", tab);
  };

  callApiByTab = (tab = this.state.tab) => {
    switch (tab) {
      case "getHongbao":
        if (this.state.historyList.length) return;
        this.getHongbaoHistory();
        break;
      case "contribute":
        if (this.state.cookies.length) return;
        this.getCookieList();
        break;
      case "rank":
        if (Object.keys(this.state.rankData).length) return;
        this.getRank();
        break;
      case "statistics":
        if (Object.keys(this.state.trendData).length) return;
        this.getTrend();
        this.getPie();
        break;
      default:
        break;
    }
  };

  getHongbaoCallback = data => {
    let { historyList } = this.state;
    historyList = [data].concat(historyList);
    this.setState({ historyList });
    this.refresh(data.id);
  };

  contributeCallback = e => {
    this.getCookieList();
    this.getAvailableCount();
  };

  onApplicationChange = e => {
    this.setState({ application: e.target.value });
    localStorage.setItem("application", e.target.value);
  };

  renderHello() {
    const { mail, id } = this.state.user;
    return (
      <h3 style={{ height: 24, overflow: "hidden" }}>
        {mail ? (
          <span>
            您好 {mail} (uid: {id})
          </span>
        ) : (
          <div style={{ marginTop: -10, width: 320 / 0.38 }}>
            <Skeleton active />
          </div>
        )}
      </h3>
    );
  }

  renderBreadcrumb = e => {
    return (
      <Breadcrumb style={{ margin: "15px 0" }}>
        <Breadcrumb.Item>
          <a
            href="https://github.com/mtdhb"
            target="_blank"
            rel="noopener noreferrer"
          >
            本站开源
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            href="https://github.com/mtdhb/mtdhb/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            反馈问题
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            onClick={e => {
              e.preventDefault();
              browserHistory.push("/applyResetPassword");
            }}
          >
            重置密码
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            退出登录
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  renderAvailable() {
    const {
      payList,
      number: { meituan, ele, star }
    } = this.state;
    return (
      <Alert
        style={{ margin: "15px 0" }}
        message={
          this.state.user.mail ? (
            [meituan, ele, star].every(item => !item || item.total === 0) ? (
              "您还没有任何贡献，请查看规则和贡献教程"
            ) : (
              <div>
                {payList.length ? (
                  <img
                    src={require("../../static/vip.png")}
                    width={20}
                    height={20}
                    style={{ marginRight: 5 }}
                    alt=""
                  />
                ) : (
                  ""
                )}
                {[
                  { text: "美团", value: meituan },
                  { text: "饿了么", value: ele },
                  { text: "饿了么星选", value: star }
                ].map(item => (
                  <span>
                    <span>{item.text}</span>
                    <span style={{ color: "#dd2323", padding: "0 10px 0 5px" }}>
                      {item.value.available}/{item.value.total}
                    </span>
                  </span>
                ))}
              </div>
            )
          ) : (
            "数据加载中，长时间没有响应请刷新页面"
          )
        }
        type={payList.length ? "error" : "info"}
      />
    );
  }
}
