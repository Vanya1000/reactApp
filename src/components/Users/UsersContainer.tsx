import Users from "./Users";
import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, getUsersThunkCreator, getUsersOnPagechangedThunkCreator, setPageSize, getUsersOnPageSize } from "../../redux/usersReducer";
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUserCount, getUsersSuper } from "../../redux/users-selectors";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
	currentPage: number
	pageSize: number
	isFetching: boolean
	totalUserCount: number
	users: Array<UsersType>
	followingInProgress: boolean

	
}

type MapDispatchPropsType = {
	getUsers: (currentPage: number, pageSize: number) => void
	getUsersOnPagechangedThunkCreator: (pageNumber: number, pageSize: number) => void
	getUsersOnPageSize: (currentPage: number, size: number) => void
	unfollow: (userId: number) => void
	follow: (userId: number) => void
	setCurrentPage: (currentPage: number) => void
	toggleFollowingProgress: (isFetching: boolean) => void
	setPageSize: (pageSize: number) => void
}

type OwnPropsType = {
	pageTitle: string
	
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize)
	}

	onPageChanged = (pageNumber: number) => {
		this.props.getUsersOnPagechangedThunkCreator(pageNumber, this.props.pageSize)
		
	}

	onPageSizeChange = (current: number, size: number) => {
		this.props.getUsersOnPageSize(this.props.currentPage, size)
}

	render() {
		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Users
				totalUserCount={this.props.totalUserCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChanged={this.onPageChanged}
				users={this.props.users}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				followingInProgress={this.props.followingInProgress}
				onPageSizeChange={this.onPageSizeChange}
			/>
		</>
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return ({
		users: getUsersSuper(state),// Super в назв просто для примера
		pageSize: getPageSize(state),
		totalUserCount: getTotalUserCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	})
}
//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
		mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsers: getUsersThunkCreator,
		getUsersOnPagechangedThunkCreator,
		setPageSize,
		getUsersOnPageSize
	}),
		//withAuthRedirect
)(UsersContainer)


//let AuthRedirectComponent = withAuthRedirect(UsersContainer)// это наш контейнерный компонет HOC
/* export default connect(mapStateToProps, {
	follow,
	unfollow,
	setCurrentPage,
	toggleFollowingProgress,
	getUsers: getUsersThunkCreator,
	getUsersOnPagechangedThunkCreator
})(AuthRedirectComponent) */

/* this.props.toggleIsFetching(true);
		usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
			this.props.setUsers(data.items)
			this.props.setCountAllUsers(data.totalCount)
			this.props.toggleIsFetching(false);
		}) */

/* this.props.setCurrentPage(pageNumber);
this.props.toggleIsFetching(true);
usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
this.props.setUsers(data.items);
	this.props.toggleIsFetching(false);
}) */

/*const mapDispatchToProps = (dispatch) => {
	return {
		follow: (userID) => {
			dispatch(followAC(userID))
		},
		unfollow: (userID) => {
			dispatch(unfollowAC(userID))
		},
		setUsers: (user) => {
			dispatch(setUsersAC(user))
		},
		setCurrentPage: (currentPage) => {
			dispatch(setCurrentPageAC(currentPage))
		},
		setCountAllUsers: (countAllUsers) => {
			dispatch(setCountAllUsersAC(countAllUsers))
		},
		toggleIsFetching: (isFetching) => {
			dispatch(toggleIsFetchingAC(isFetching))
		}
		
	}
}
*/