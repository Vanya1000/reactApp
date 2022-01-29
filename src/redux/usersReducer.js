import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_PAGE_SIZE = 'users/SET_PAGE_SIZE';
const SET_COUNT_ALL_USERS = 'users/SET_COUNT_ALL_USERS';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

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
		case SET_PAGE_SIZE:
			return {
				...state,
				pageSize: action.pageSize
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
export const setPageSize = (pageSize) => ({ type: SET_PAGE_SIZE, pageSize });
export const setCountAllUsers = (countAllUsers) => ({ type: SET_COUNT_ALL_USERS, countAllUsers });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching });


export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	dispatch(toggleIsFetching(true));
	let data = await usersAPI.getUsers(currentPage, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setCountAllUsers(data.totalCount));
}

export const getUsersOnPagechangedThunkCreator = (pageNumber, pageSize) => async (dispatch) => {
	dispatch(setCurrentPage(pageNumber));
	dispatch(toggleIsFetching(true));
	let data = await usersAPI.getUsers(pageNumber, pageSize);
	dispatch(setUsers(data.items));
	dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true));
	let data = await apiMethod(userId);
	if (data.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false));
}

export const follow = (userId) => async (dispatch) => {
	followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), followSucsess)
}
export const unfollow = (userId) => async (dispatch) => {
	followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(usersAPI), unfollowSucsess)
}


export default usersReducer;