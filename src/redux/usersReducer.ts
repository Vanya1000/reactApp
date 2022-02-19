import { ResponseType } from './../api/api';
import { AppStateType, InferActionTypes, BaseThunkType } from './redux-store';
import { PhotosType, UsersType } from './../types/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/user-api';

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

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				users: action.users
			}
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

type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
	followSucsess: (userId: number) => ({ type: FOLLOW, userId } as const),
	unfollowSucsess: (userId: number) => ({ type: UNFOLLOW, userId } as const),
	setUsers: (users: Array<UsersType>) => ({ type: SET_USERS, users } as const),
	setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
	setPageSize: (pageSize: number) => ({ type: SET_PAGE_SIZE, pageSize } as const),
	setCountAllUsers: (countAllUsers: number) => ({ type: SET_COUNT_ALL_USERS, countAllUsers } as const),
	toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),
	toggleFollowingProgress: (isFetching: boolean) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching } as const)
}


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	dispatch(actions.toggleIsFetching(true));
	let data = await usersAPI.getUsers(currentPage, pageSize);
	dispatch(actions.toggleIsFetching(false));
	dispatch(actions.setUsers(data.items));
	dispatch(actions.setCountAllUsers(data.totalCount));
}

export const getUsersOnPageSize = (pageNumber: number, pageSize: number): ThunkType => async (dispatch) => {
	dispatch(actions.setPageSize(pageSize));
	dispatch(actions.toggleIsFetching(true));
	let data = await usersAPI.getUsers(pageNumber, pageSize);
	dispatch(actions.setUsers(data.items));
	dispatch(actions.toggleIsFetching(false));
}

export const getUsersOnPagechangedThunkCreator = (pageNumber: number, pageSize: number): ThunkType => async (dispatch) => {
	dispatch(actions.setCurrentPage(pageNumber));
	dispatch(actions.toggleIsFetching(true));
	let data = await usersAPI.getUsers(pageNumber, pageSize);
	dispatch(actions.setUsers(data.items));
	dispatch(actions.toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userId: number) => ActionsTypes ) => {
	dispatch(actions.toggleFollowingProgress(true));
	let response = await apiMethod(userId);
	if (response.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actions.toggleFollowingProgress(false));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
	await followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), actions.followSucsess)
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
	await followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(usersAPI), actions.unfollowSucsess)
}


export default usersReducer;