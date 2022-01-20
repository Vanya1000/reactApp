import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_COUNT_ALL_USERS = 'SET_COUNT_ALL_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
	users: [],
	pageSize: 100,
	totalUserCount: 1,
	currentPage: 1,
	isFetching: true,
	followingInProgress: false
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map((u) => u.id === action.userId ? { ...u, followed: true } : u)
			}
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map((u) => u.id === action.userId ? { ...u, followed: false } : u)
			}
		case SET_USERS:
			return {
				...state,
				users: action.users
			}
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage
			}
		case SET_COUNT_ALL_USERS:
			return {
				...state,
				totalUserCount: action.countAllUsers
			}
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
			}
		default:
			return state;
	}
}

export const followSucsess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSucsess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setCountAllUsers = (countAllUsers) => ({ type: SET_COUNT_ALL_USERS, countAllUsers });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching });

export const getUsersThunkCreator = (currentPage, pageSize) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		usersAPI.getUsers(currentPage, pageSize).then(data => {
			dispatch(toggleIsFetching(false));
			dispatch(setUsers(data.items));
			dispatch(setCountAllUsers(data.totalCount));
		});
	}
}

export const getUsersOnPagechangedThunkCreator = (pageNumber, pageSize) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		dispatch(setCurrentPage(pageNumber));

		dispatch(toggleIsFetching(true));
		usersAPI.getUsers(pageNumber, pageSize).then(data => {
			dispatch(setUsers(data.items));
			dispatch(toggleIsFetching(false));
		});
	}
}

export const follow = (userId) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		dispatch(toggleFollowingProgress(true));
		usersAPI.setFollow(userId).then(data => {
			if (data.resultCode === 0) {
				dispatch(unfollowSucsess(userId));
			}
			dispatch(toggleFollowingProgress(false));
		})
	}
}

export const unfollow = (userId) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		dispatch(toggleFollowingProgress(true));
		usersAPI.setUnfollow(userId).then(data => {
			if (data.resultCode === 0) {
				dispatch(followSucsess(userId));
			}
			dispatch(toggleFollowingProgress(false));
		})
	}
}

export default usersReducer;