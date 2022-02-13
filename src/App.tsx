import React, { Suspense } from "react";
import "antd/dist/antd.css";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import Music from './components/Music/Music';
import NotesContainer from './components/Notes/NotesContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { withSuspense } from "./HOC/withSuspense";
import { AppStateType } from "./redux/redux-store";
//const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // изменить имя

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
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
          <Route path="/dialogs" render={() => <SuspendedDialogs />} />{/* Обернули HOC */} 
          <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />{/* Обернули HOC */} 
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/notes" render={() => <NotesContainer />} />
          <Route path="/users" render={() => <UsersContainer pageTitle={'example'}/>} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/login" render={() => <LoginPage />} />
          </div>
        </div>
    );
  }
}
const mapStateToProps = (state:AppStateType) => ({
  initialized: state.app.initialized

})
export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);