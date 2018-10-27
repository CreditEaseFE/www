import React from 'react';
import {Alert, Breadcrumb, Tabs, message, Carousel} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import {axios, apis, logout} from '../../api';
import Alipay from '../../component/Alipay';
import Notice from '../../component/Notice';
import Loadable from '../../component/Loadable';
import Media from '../../component/Media';
import Domain from '../../component/Domain';
import GetHongbao from './GetHongbao';
import Contribute from './Contribute';
import FriendLink from './FriendLink';
import Rules from './Rules';
import Rank from './Rank';
import Statistics from './Statistics';
import JoinGroup from './JoinGroup';
import MiniProgram from './MiniProgram';
import {browserHistory} from 'react-router';
const Talk = Loadable(() => import('../../component/Talk'));

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
      tab: localStorage.getItem('tab') || '1',
      application: 1, // parseInt(localStorage.getItem('application') || 0, 10),
      carouselRecords: [],
      rankData: {},
      trendData: {},
      pieData: {
        ele: [],
        meituan: []
      }
    };
    document.body.classList.add('is-home');
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.callApiByTab();
      this.getUserInfo();
      this.getAvailableCount();
      this.zhuangbi();
    } else {
      logout();
    }
  }

  render() {
    const {application, historyList, tab, cookies, rankData, trendData, pieData} = this.state;
    return (
      <Container>
        <Column>
          {this.renderCarousel()}
          {this.renderHello()}
          {this.renderBreadcrumb()}
          <Alipay />
          <Domain />
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
              <GetHongbao historyList={historyList} callback={this.getHongbaoCallback} />
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
    const {carouselRecords = []} = this.state;
    return (
      <div style={{height: '30px', overflow: 'hidden'}}>
        {carouselRecords.length ? (
          <Carousel vertical autoplay>
            {carouselRecords.map((o, i) => (
              <div key={i} style={{color: '#5bab60', fontSize: '16px', whiteSpace: 'nowrap'}}>
                {o.mail} 在 {moment(new Date(o.gmtModified)).format('HH:mm:ss')} 领到
                <span style={{color: '#dd2323'}}>&nbsp;{o.price}&nbsp;</span>
                元{o.application ? '饿了么' : '美团'}大红包
              </div>
            ))}
          </Carousel>
        ) : (
          ''
        )}
      </div>
    );
  }

  deleteCookieCallback = id => {
    //前端删除
    let cookies = this.state.cookies.filter(o => o.id !== id);
    this.setState({cookies});
    //刷新
    this.getAvailableCount();
  };

  getTrend = e => {
    axios.get(apis.getTrend).then(data => this.setState({trendData: data.data}));
  };

  getRank = e => {
    axios.get(apis.getRank).then(data => this.setState({rankData: data.data}));
  };

  getUserInfo = e => {
    axios.get(apis.getUser).then(data => {
      if (data.code === 0) {
        this.setState({user: data.data});
      } else {
        message.error(data.message);
      }
    });
  };

  getCookieList = e => {
    axios.get(apis.cookie).then(data => {
      if (data.code === 0) {
        let cookies = data.data;
        cookies.forEach((c, i) => {
          c.time = moment(new Date(c.gmtCreate)).format('YYYY-MM-DD HH:mm:ss');
          c.key = i;
          c.nickname = c.nickname || '--';
        });
        this.setState({cookies});
      } else {
        message.error(data.message);
      }
    });
  };

  getAvailableCount = e => {
    axios.get(apis.getAvailableCount).then(data => this.setState({number: data.data}));
  };

  getHongbaoHistory = e => {
    axios.get(apis.getHongbaoHistory).then(data => this.setState({historyList: data.data}));
  };

  refresh = id => {
    axios.get(`${apis.refresh}/${id}`).then(res => {
      const {data} = res;
      if (data.status === 0) {
        setTimeout(() => this.refresh(id), 1000);
      } else {
        const {historyList} = this.state;
        historyList[0] = data;
        this.setState({historyList});
        this.getAvailableCount();
      }
    });
  };

  zhuangbi = e => {
    axios.get(apis.zhuangbi).then(res => this.setState({carouselRecords: res.data}));
  };

  getPie = e => {
    axios.get(apis.getPie).then(res => this.setState({pieData: res.data}));
  };

  onTabChange = tab => {
    this.callApiByTab(tab);
    localStorage.setItem('tab', tab);
  };

  callApiByTab = (tab = this.state.tab) => {
    switch (tab) {
      case 'getHongbao':
        if (this.state.historyList.length) return;
        this.getHongbaoHistory();
        break;
      case 'contribute':
        if (this.state.cookies.length) return;
        this.getCookieList();
        break;
      case 'rank':
        if (Object.keys(this.state.rankData).length) return;
        this.getRank();
        break;
      case 'statistics':
        if (Object.keys(this.state.trendData).length) return;
        this.getTrend();
        this.getPie();
        break;
      default:
        break;
    }
  };

  getHongbaoCallback = data => {
    let {historyList} = this.state;
    historyList = [data].concat(historyList);
    this.setState({historyList});
    this.refresh(data.id);
  };

  contributeCallback = e => {
    this.getCookieList();
    this.getAvailableCount();
  };

  onApplicationChange = e => {
    this.setState({application: e.target.value});
    localStorage.setItem('application', e.target.value);
  };

  renderHello() {
    const {mail, id} = this.state.user;
    return <h3>{mail ? `您好 ${mail} (uid: ${id})` : '您好'}</h3>;
  }

  renderBreadcrumb = e => {
    return (
      <Breadcrumb style={{margin: '15px 0'}}>
        <Breadcrumb.Item>
          <a href="https://github.com/mtdhb" target="_blank" rel="noopener noreferrer">
            本站开源
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="https://github.com/mtdhb/mtdhb/issues" target="_blank" rel="noopener noreferrer">
            反馈问题
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            onClick={e => {
              e.preventDefault();
              browserHistory.push('/applyResetPassword');
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
    const {meituan, ele} = this.state.number;
    return (
      <Alert
        style={{margin: '15px 0'}}
        message={
          this.state.user.mail ? (
            meituan.total === 0 && ele.total === 0 ? (
              '您还没有任何贡献，请查看规则和贡献教程'
            ) : (
              <div>
                <span>今日剩余次数：美团</span>
                <span style={{color: '#dd2323', padding: '0 10px 0 5px'}}>
                  {meituan.available}/{meituan.total}
                </span>
                <span>饿了么</span>
                <span style={{color: '#dd2323', padding: '0 10px 0 5px'}}>
                  {ele.available}/{ele.total}
                </span>
              </div>
            )
          ) : (
            '数据加载中，长时间没有响应请刷新页面'
          )
        }
        type="info"
      />
    );
  }
}
