import React from "react";
import s from './Profile.module.css';
import Profile from "./Profile";
import * as axios from 'axios';
import { connect } from "react-redux";
import { getUserProfileThunkCreator, setUserProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { usersAPI } from "../../api/api";



class ProfileContainer extends React.Component {
	debugger;
	componentDidMount() {
	let userId = this.props.match.params.userId;
		if (!userId) {
			userId = 21887;
		} 
		this.props.getUserProfileThunkCreator(userId)
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

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setUserProfile, getUserProfileThunkCreator })(WithUrlDataContainerComponent);