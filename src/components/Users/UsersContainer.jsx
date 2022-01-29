import Users from "./Users";
import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, getUsersThunkCreator, getUsersOnPagechangedThunkCreator, setPageSize } from "../../redux/usersReducer";
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUserCount, getUsersSuper } from "../../redux/users-selectors";


class UsersContainer extends React.Component {

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
				setPageSize={this.props.setPageSize}
			/>
		</>
	}
}

const mapStateToProps = (state) => {
	return ({
		users: getUsersSuper(state),// Super в назв просто для примера
		pageSize: getPageSize(state),
		totalUserCount: getTotalUserCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	})
}

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsers: getUsersThunkCreator,
		getUsersOnPagechangedThunkCreator,
		setPageSize
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