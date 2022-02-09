import { AppStateType } from './redux-store';
import { PostType, ProfileType, ContactsType, PhotosType } from './../types/types';
import { profileAPI, ResultCodesEnum } from "../api/api";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const ADD_POST = 'profile/ADD-POST'; {/*action type*/ } {/*используем вместо строк что бы не опечататься*/ }
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS_TEXT = 'profile/SET_STATUS_TEXT';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
	posts: [
		{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
		{ id: 2, message: 'Its my first post!', likesCount: 2 }
	] as Array<PostType> ,
	profile: null as ProfileType | null,
	newStatusText: '-----'
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case ADD_POST: {
			return {
				...state,
				posts: [...state.posts, { id: 5, message: action.newPost, likesCount: 0 }],
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			};
		}
		case SET_STATUS_TEXT: {
			return {
				...state,
				newStatusText: action.statusText
			};
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: {...state.profile, photos: action.photos} as ProfileType //! временно
			};
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId)
			};
		}
		default:
			return state;
	}
}

type ActionsTypes = AddPostActionType | SetUserProfileActionType | SavePhotoSuccessActionType | setNewMessageTextStatusActionType | DeletePostActionType

type AddPostActionType = {
	type: typeof ADD_POST
	newPost: string
}

export const addPost = (post: string): AddPostActionType  =>
	({ type: ADD_POST, newPost: post });

type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType =>
	({ type: SET_USER_PROFILE, profile });

type SavePhotoSuccessActionType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType =>
	({ type: SAVE_PHOTO_SUCCESS, photos });

type setNewMessageTextStatusActionType = {
	type: typeof SET_STATUS_TEXT
	statusText: string
}

export const setNewMessageTextStatus = (statusText: string): setNewMessageTextStatusActionType =>
	({ type: SET_STATUS_TEXT, statusText: statusText });

type DeletePostActionType = {
	type: typeof DELETE_POST
	postId: number
}

export const deletePost = (postId: number): DeletePostActionType =>
	({ type: DELETE_POST, postId });



type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfileThunkCreator = (userId: number | null): ThunkType => async (dispatch) => { //для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let userProfileData = await profileAPI.getUserProfile(userId);
	dispatch(setUserProfile(userProfileData));
}

export const getStatusThuncCreator = (id: number): ThunkType => async (dispatch) => {
	let getStatusData = await profileAPI.getStatus(id);
	dispatch(setNewMessageTextStatus(getStatusData));
}

export const updateTextStatusThuncCreator = (newStatusText: string): ThunkType => async (dispatch) => {
	let updateStatusData = await profileAPI.updateStatus(newStatusText);
	if (updateStatusData.resultCode === ResultCodesEnum.Success) {
		dispatch(setNewMessageTextStatus(newStatusText));
	}
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
	let savePhotoData = await profileAPI.savePhoto(file);
	if (savePhotoData.resultCode === 0) {
		dispatch(savePhotoSuccess(savePhotoData.data.photos));
	}
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {//?берем из стейта то, что нам нужно. Не запрещено
	const userId = getState().auth.id;
	let saveProfileData = await profileAPI.saveProfile(profile);
	if (saveProfileData.resultCode === ResultCodesEnum.Success) {
		dispatch(getUserProfileThunkCreator(userId))  
	} else {
		//dispatch(setErrorWrong(true));//! Нужно реализовать отображение ошибки!
	}
}


export default profileReducer;