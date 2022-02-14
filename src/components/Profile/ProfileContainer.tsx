import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatusThuncCreator, getUserProfileThunkCreator, savePhoto, saveProfile, actions } from "../../redux/profileReducer";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";
import { withRouter, RouteComponentProps } from "react-router-dom";

const { setUserProfile } = actions

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
	setUserProfile: (userId: number) => void
	getUserProfileThunkCreator: (userId: number) => void
	getStatusThuncCreator: (userId: number) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => void
}

type PathParamsType = {
	userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		let userId: number | null = +this.props.match.params.userId;
		if (!userId) {
			userId = this.props.userId;
		}
		if (!userId) {
			console.error("ID should exists in URI params or in state ('authorizedUserId')");
		} else {
		this.props.getUserProfileThunkCreator(userId)
		this.props.getStatusThuncCreator(userId)
		}
	}

	componentDidMount() {
		this.refreshProfile();
	}
	componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {//только если предыдущ пропсы не равны
			this.refreshProfile();
		}
		
	}
	render () {
		return (
			// todo: profile | null падает ошибка!
			// @ts-ignore
			<Profile isOwner={!this.props.match.params.userId} {...this.props} profile={this.props.profile} savePhoto={this.props.savePhoto}/>
		)
	}
}

//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)// это наш контейнерный компонет его рисует ithUrlDataContainerComponent, а он рисует ProfileContainer 

const mapStateToProps = (state: AppStateType) => {
	return ({
		profile: state.profilePage.profile,
		userId: state.auth.id,
		//isAuth: state.auth.IsAuth
	})
}

//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

//export default connect(mapStateToProps, { setUserProfile, getUserProfileThunkCreator })(WithUrlDataContainerComponent);

export default compose<React.ComponentType>(
	connect(mapStateToProps, { setUserProfile, getUserProfileThunkCreator, getStatusThuncCreator, savePhoto, saveProfile }),
	withRouter,
	withAuthRedirect,
)(ProfileContainer)
