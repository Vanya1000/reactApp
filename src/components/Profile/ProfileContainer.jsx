import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatusThuncCreator, getUserProfileThunkCreator, savePhoto, setUserProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";



class ProfileContainer extends React.Component {
	refreshProfile() {
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.userId;
		}
		this.props.getUserProfileThunkCreator(userId)
		this.props.getStatusThuncCreator(userId)
	}

	componentDidMount() {
		this.refreshProfile();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {//только если предыдущ пропсы не равны
			this.refreshProfile();
		}
		
	}
	render () {
		return (
			<Profile isOwner={!this.props.match.params.userId} {...this.props} profile={this.props.profile} savePhoto={this.props.savePhoto}/>
		)
	}
}

//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)// это наш контейнерный компонет его рисует ithUrlDataContainerComponent, а он рисует ProfileContainer 

const mapStateToProps = (state) => {
	return ({
		profile: state.profilePage.profile,
		userId: state.auth.id,
		isAuth: state.auth.IsAuth
	})
}

//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

//export default connect(mapStateToProps, { setUserProfile, getUserProfileThunkCreator })(WithUrlDataContainerComponent);

export default compose(
	connect(mapStateToProps, { setUserProfile, getUserProfileThunkCreator, getStatusThuncCreator, savePhoto }),
	withRouter,
	withAuthRedirect,
)(ProfileContainer)
