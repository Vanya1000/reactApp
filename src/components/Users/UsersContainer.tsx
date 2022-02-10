import Users from "./Users";
import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, getUsersThunkCreator, getUsersOnPagechangedThunkCreator, getUsersOnPageSize, actions} from "../../redux/usersReducer";
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUserCount, getUsersSuper } from "../../redux/users-selectors";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

const { setCurrentPage, setPageSize, toggleFollowingProgress} = actions


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
