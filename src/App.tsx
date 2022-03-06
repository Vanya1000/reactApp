import React, { Suspense } from "react";
import "antd/dist/antd.css";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Music from './components/Music/Music';
import NotesContainer from './components/Notes/NotesContainer';
import { UsersPage } from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { NavLink, Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { withSuspense } from "./HOC/withSuspense";
import { AppStateType } from "./redux/redux-store";
import { Login } from "./components/Login/Login";
import { Button } from "antd";
//const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // изменить имя

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return (<Preloader />)
    }
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" /* defaultSelectedKeys={['2']} */>
            <Menu.Item key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/users">Users</NavLink></Menu.Item>
            <Menu.Item key="3">ndfg</Menu.Item>
            <HeaderContainer />
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                /* defaultSelectedKeys={['1']} */
                /* defaultOpenKeys={['sub1']} */
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/dialogs">Messages</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                  <Menu.Item key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Other">
                  <Menu.Item key="4"><NavLink to="/news">News</NavLink></Menu.Item>
                  <Menu.Item key="5"><NavLink to="/music">Music</NavLink></Menu.Item>
                  <Menu.Item key="6"><NavLink to="/notes">Notes</NavLink></Menu.Item>
                  <Menu.Item key="7"><NavLink to="/settings">Settings</NavLink></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div className='app-wrapper-content'>
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/notes" render={() => <NotesContainer />} />
                <Route path="/users" render={() => <UsersPage pageTitle={'example'} />} />
                <Route path="/settings" render={() => <Settings />} />
                <Route path="/login" render={() => <Login />} />
              </div>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}> ©2022 </Footer>
      </Layout>
    );
  }
}
const mapStateToProps = (state:AppStateType) => ({
  initialized: state.app.initialized

})
export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

/*<div className="app-wrapper">
  <HeaderContainer />
  <Navbar />
  <div className='app-wrapper-content'>
    <Route path="/dialogs" render={() => <SuspendedDialogs />} />
    <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
    <Route path="/news" render={() => <News />} />
    <Route path="/music" render={() => <Music />} />
    <Route path="/notes" render={() => <NotesContainer />} />
    <Route path="/users" render={() => <UsersPage pageTitle={'example'} />} />
    <Route path="/settings" render={() => <Settings />} />
    <Route path="/login" render={() => <Login />} />
  </div>
</div>
*/