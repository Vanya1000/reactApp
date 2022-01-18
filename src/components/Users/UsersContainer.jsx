import * as axios from 'axios';
import Users from "./Users";
import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, setUsers, unfollow, setCountAllUsers, toggleIsFetching } from "../../redux/usersReducer";
import preloader from '../../assets/images/Circle-Loading.svg';
import Preloader from '../common/Preloader/Preloader';


class UsersAPIComponent extends React.Component {

	componentDidMount() {
		this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {withCredentials: true} ).then(response => {
			this.props.setUsers(response.data.items)
			this.props.setCountAllUsers(response.data.totalCount)
			this.props.toggleIsFetching(false);
		})
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);
		this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, { withCredentials: true }).then(response => {
		this.props.setUsers(response.data.items);
			this.props.toggleIsFetching(false);
		})
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
		isFetching: state.usersPage.isFetching
		
	})
}

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

const UsersContainer = connect(mapStateToProps, {
	follow,
	unfollow,
	setUsers,
	setCurrentPage,
	setCountAllUsers,
	toggleIsFetching
})(UsersAPIComponent)

export default UsersContainer;