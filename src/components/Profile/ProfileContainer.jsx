import React from "react";
import s from './Profile.module.css';
import Profile from "./Profile";
import * as axios from 'axios';
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profileReducer";
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

class ProfileContainer extends React.Component {
	debugger;
	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
			this.props.setUserProfile(response.data)
		})
	}
	render () {
		return (
			<Profile {...this.props} profile={this.props.profile}/>
		)
	}
}

const mapStateToProps = (state) => {
	return ({
		profile: state.profilePage.profile
	})
}


export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainerComponent);