import { PostType, ProfileType, ContactsType, PhotosType } from './../types/types';
import { profileAPI } from "../api/api";

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

const profileReducer = (state = initialState, action: any): InitialStateType => {
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

export const getUserProfileThunkCreator = (userId: number) => async (dispatch: any) => { //для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let response = await profileAPI.getUserProfile(userId);
	dispatch(setUserProfile(response.data));
}

export const setNewMessageTextStatus = (statusText: string) =>
	({ type: SET_STATUS_TEXT, statusText: statusText });

export const getStatusThuncCreator = (id: number) => async (dispatch: any) => {
	let response = await profileAPI.getStatus(id);
	dispatch(setNewMessageTextStatus(response.data));
}

export const updateTextStatusThuncCreator = (newStatusText: string) => async (dispatch: any) => {
	let response = await profileAPI.updateStatus(newStatusText);
	if (response.data.resultCode === 0) {
		dispatch(setNewMessageTextStatus(newStatusText));
	}
}

export const savePhoto = (file: any) => async (dispatch: any) => {
	let response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {//?берем из стейта то, что нам нужно. Не запрещено
	const userId = getState().auth.id;
	let response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfileThunkCreator(userId))  
	} else {
		//dispatch(setErrorWrong(true));//! Нужно реализовать отображение ошибки!
	}
}

type DeletePostActionType = {
	type: typeof DELETE_POST
	postId: number
}

export const deletePost = (postId: number): DeletePostActionType =>
	({ type: DELETE_POST, postId });

export default profileReducer;