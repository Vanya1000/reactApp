import React from "react";
import s from './Profile.module.css';
import Profile from "./Profile";
import * as axios from 'axios';
import { connect } from "react-redux";
import { getUserProfileThunkCreator, setUserProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { usersAPI } from "../../api/api";
import { Redirect } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";



class ProfileContainer extends React.Component {
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

//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)// это наш контейнерный компонет его рисует ithUrlDataContainerComponent, а он рисует ProfileContainer 

const mapStateToProps = (state) => {
	return ({
		profile: state.profilePage.profile,
	})
}

//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

//export default connect(mapStateToProps, { setUserProfile, getUserProfileThunkCreator })(WithUrlDataContainerComponent);

export default compose(
	connect(mapStateToProps, { setUserProfile, getUserProfileThunkCreator }),
	withRouter,
	withAuthRedirect,
)(ProfileContainer)