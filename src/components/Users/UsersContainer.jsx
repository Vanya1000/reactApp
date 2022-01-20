import Users from "./Users";
import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, getUsersThunkCreator, getUsersOnPagechangedThunkCreator } from "../../redux/usersReducer";
import Preloader from '../common/Preloader/Preloader';


class UsersAPIComponent extends React.Component {

	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize)
	}

	onPageChanged = (pageNumber) => {
		this.props.getUsersOnPagechangedThunkCreator(pageNumber, this.props.pageSize)
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
			/>
		</>
	}
}

const mapStateToProps = (state) => {
	return ({
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUserCount: state.usersPage.totalUserCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress
	})
}

const UsersContainer = connect(mapStateToProps, {
	follow,
	unfollow,
	setCurrentPage,
	toggleFollowingProgress,
	getUsers: getUsersThunkCreator,
	getUsersOnPagechangedThunkCreator
})(UsersAPIComponent)

export default UsersContainer;

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
}*/