import React, { useState } from "react";
import {
  Alert,
  Breadcrumb,
  Tabs,
  message,
  Carousel,
  Skeleton,
  Table
} from "antd";
import styled from "styled-components";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
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

const Home = () => {
  const [user, setUser] = useState({});
  const [cookies, setCookies] = useState([]);
  const [payList, setPayList] = useState([]);
  const [payListVisible, setPayListVisible] = useState(false);
  const [number, setNumber] = useState({
    ele: {
      available: 0,
      total: 0
    },
    meituan: {
      available: 0,
      total: 0
    }
  });
  const [historyList, setHistoryList] = useState([]);
  const [tab] = useState(localStorage.getItem("tab") || "1");
  const [application, setApplication] = useState(
    parseInt(localStorage.getItem("application") || 1, 10)
  );
  const [carouselRecords, setCarouselRecords] = useState([]);
  const [rankData, setRankData] = useState({});
  const [trendData, setTrendData] = useState({});
  const [pieData, setPieData] = useState({
    ele: [],
    meituan: []
  });

  const callApiByTab = async (currentTab = tab) => {
    switch (currentTab) {
      case "getHongbao":
        if (historyList.length) return;
        await getHongbaoHistory();
        break;
      case "contribute":
        if (cookies.length) return;
        await getCookieList();
        break;
      case "rank":
        if (Object.keys(rankData).length) return;
        await getRank();
        break;
      case "statistics":
        if (Object.keys(trendData).length) return;
        await Promise.all([getTrend(), getPie()]);
        break;
      default:
        break;
    }
  };

  const deleteCookieCallback = async id => {
    setCookies(cookies.filter(item => item.id !== id));
    await getAvailableCount();
  };

  const getTrend = async () => {
    const { data } = await axios.get(apis.getTrend);
    setTrendData(data);
  };

  const getRank = async () => {
    const [rankRes, payRankRes] = await Promise.all([
      axios.get(apis.getRank),
      axios.get(apis.getPayRank)
    ]);
    rankRes.data.pay = payRankRes.data;
    setRankData(rankRes.data);
  };

  const getUserInfo = async () => {
    const userRes = await axios.get(apis.getUser);
    if (userRes.code !== 0) {
      return message.error(userRes.message);
    }
    setUser(userRes.data);
    const payListRes = await axios.get(`${apis.getPayList}/${userRes.data.id}`);
    setPayList(payListRes.data);
  };

  const getCookieList = async () => {
    const data = await axios.get(apis.cookie);
    if (data.code === 0) {
      const cookieList = data.data;
      cookieList.forEach((item, index) => {
        item.time = moment(new Date(item.gmtCreate)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        item.key = index;
        item.nickname = `[ID:${item.id}] ${item.nickname || "无昵称"}`;
      });
      setCookies(cookieList);
    } else {
      message.error(data.message);
    }
  };

  const getAvailableCount = async () => {
    const { data } = await axios.get(apis.getAvailableCount);
    setNumber(data);
  };

  const getHongbaoHistory = async () => {
    const { data } = await axios.get(apis.getHongbaoHistory);
    setHistoryList(data);
  };

  const refresh = async id => {
    const { data } = await axios.get(`${apis.refresh}/${id}`);
    if (data.status === 0) {
      setTimeout(() => refresh(id), 1000);
    } else {
      historyList[0] = data;
      setHistoryList(historyList);
      await getAvailableCount();
    }
  };

  const zhuangbi = async () => {
    const { data } = await axios.get(apis.zhuangbi);
    setCarouselRecords(data);
  };

  const getPie = async () => {
    const { data } = await axios.get(apis.getPie);
    setPieData(data);
  };

  const onTabChange = async tab => {
    localStorage.setItem("tab", tab);
    await callApiByTab(tab);
  };

  const getHongbaoCallback = async data => {
    setHistoryList([data, ...historyList]);
    await refresh(data.id);
  };

  const contributeCallback = async () => {
    await Promise.all([getCookieList(), getAvailableCount()]);
  };

  const onApplicationChange = event => {
    const { value } = event.target;
    setApplication(value);
    localStorage.setItem("application", value);
  };

  useState(async () => {
    document.body.classList.add("is-home");
    if (localStorage.getItem("token")) {
      await Promise.all([
        callApiByTab(),
        getUserInfo(),
        getAvailableCount(),
        zhuangbi()
      ]);
    } else {
      logout();
    }
  }, []);

  const renderHello = () => {
    const { mail, id } = user;
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
  };

  const renderCarousel = () => {
    const style = {
      color: "#5bab60",
      fontSize: "16px",
      whiteSpace: "nowrap"
    };
    return (
      <div style={{ height: "30px", overflow: "hidden" }}>
        {carouselRecords.length ? (
          <Carousel vertical autoplay>
            {carouselRecords.map((item, index) => (
              <div key={index}>
                <div style={style}>
                  {item.mail} 在{" "}
                  {moment(new Date(item.gmtModified)).format("HH:mm:ss")} 领到
                  <span style={{ color: "#dd2323" }}>
                    &nbsp;{item.price}&nbsp;
                  </span>
                  元{item.application === 0 ? "美团" : "饿了么"}大红包
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
  };

  const renderBreadcrumb = () => (
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
        <Link to="/applyResetPassword">重置密码</Link>
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

  const renderAvailable = () => {
    const { meituan, ele, star } = number;
    return (
      <div>
        <div onClick={() => setPayListVisible(!payListVisible)}>
          <Alert
            style={{ margin: "15px 0" }}
            message={
              user.mail ? (
                [meituan, ele, star].every(
                  item => !item || item.total === 0
                ) ? (
                  "您还没有任何贡献，请查看规则和贡献教程"
                ) : (
                  <div>
                    {[
                      { text: "美团", value: meituan },
                      { text: "饿了么", value: ele },
                      { text: "饿了么星选", value: star }
                    ].map(item => (
                      <span>
                        <span>{item.text}</span>
                        <span
                          style={{ color: "#dd2323", padding: "0 10px 0 5px" }}
                        >
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
        </div>
        {payListVisible && payList.length ? (
          <div>
            <p>非贡献小号加的次数列表（包括购买和排行榜赠送的次数）</p>
            <Table
              dataSource={payList}
              columns={[
                {
                  title: "编号",
                  dataIndex: "id"
                },
                {
                  title: "平台",
                  dataIndex: "application",
                  render: application =>
                    ["美团", "饿了么", "饿了么星选"][application] || "异常"
                },
                {
                  title: "加次数",
                  dataIndex: "number"
                },
                {
                  title: "到期时间（含）",
                  dataIndex: "gmt_create",
                  render: gmt_create => (gmt_create || "异常").slice(0, 10)
                }
              ]}
              pagination={{
                pageSize: 5,
                size: "small",
                total: payList.length
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <Container>
      <Column>
        {renderCarousel()}
        {renderHello()}
        {renderBreadcrumb()}
        <Pay user={user} />
        {renderAvailable()}
        <Notice />
        <Talk />
      </Column>
      <Column>
        <Tabs defaultActiveKey={tab} onChange={onTabChange}>
          <Tabs.TabPane tab="规则" key="rule">
            <Rules />
          </Tabs.TabPane>
          <Tabs.TabPane tab="领取" key="getHongbao">
            <GetHongbao
              historyList={historyList}
              callback={getHongbaoCallback}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="贡献" key="contribute">
            <Contribute
              contributeCallback={contributeCallback}
              onApplicationChange={onApplicationChange}
              application={application}
              cookies={cookies}
              deleteCookieCallback={deleteCookieCallback}
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
};

export default withRouter(Home);
