import { PhotosType, UsersType } from './../types/types';
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
	users: [] as Array<UsersType>,
	pageSize: 10,
	totalUserCount: 1,
	currentPage: 1,
	isFetching: true,
	followingInProgress: false
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
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
type FollowSucsessActionType = {
	type: typeof FOLLOW
	userId: number
}
export const followSucsess = (userId: number): FollowSucsessActionType => ({ type: FOLLOW, userId });

type UnfollowSucsessActionType = {
	type: typeof UNFOLLOW
	userId: number
}
export const unfollowSucsess = (userId: number): UnfollowSucsessActionType => ({ type: UNFOLLOW, userId });

type SetUsersActionType = {
	type: typeof SET_USERS
	users: UsersType
}
export const setUsers = (users: UsersType): SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });

type SetPageSizeActionType = {
	type: typeof SET_PAGE_SIZE
	pageSize: number
}
export const setPageSize = (pageSize: number): SetPageSizeActionType => ({ type: SET_PAGE_SIZE, pageSize });

type SetCountAllUsersActionType = {
	type: typeof SET_COUNT_ALL_USERS
	countAllUsers: number
}
export const setCountAllUsers = (countAllUsers: number): SetCountAllUsersActionType => ({ type: SET_COUNT_ALL_USERS, countAllUsers });

type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type ToggleFollowingProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching: boolean
}
export const toggleFollowingProgress = (isFetching: boolean): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching });


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	dispatch(toggleIsFetching(true));
	let data = await usersAPI.getUsers(currentPage, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setCountAllUsers(data.totalCount));
}

export const getUsersOnPageSize = (pageNumber: number, pageSize: number) => async (dispatch: any) => {
	dispatch(setPageSize(pageSize));
	dispatch(toggleIsFetching(true));
	let data = await usersAPI.getUsers(pageNumber, pageSize);
	dispatch(setUsers(data.items));
	dispatch(toggleIsFetching(false));
}

export const getUsersOnPagechangedThunkCreator = (pageNumber: number, pageSize: number) => async (dispatch: any) => {
	dispatch(setCurrentPage(pageNumber));
	dispatch(toggleIsFetching(true));
	let data = await usersAPI.getUsers(pageNumber, pageSize);
	dispatch(setUsers(data.items));
	dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
	dispatch(toggleFollowingProgress(true));
	let data = await apiMethod(userId);
	if (data.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false));
}

export const follow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), followSucsess)
}
export const unfollow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(usersAPI), unfollowSucsess)
}


export default usersReducer;