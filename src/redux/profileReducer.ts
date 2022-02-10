
import { AppStateType, InferActionTypes } from './redux-store';
import { PostType, ProfileType, ContactsType, PhotosType } from './../types/types';
import { ResultCodesEnum } from "../api/api";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { profileAPI } from '../api/profile-api';

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
		case 'profile/ADD-POST': {
			return {
				...state,
				posts: [...state.posts, { id: 5, message: action.newPost, likesCount: 0 }],
			};
		}
		case 'profile/SET_USER_PROFILE': {
			return {
				...state,
				profile: action.profile
			};
		}
		case 'profile/SET_STATUS_TEXT': {
			return {
				...state,
				newStatusText: action.statusText
			};
		}
		case 'profile/SAVE_PHOTO_SUCCESS': {
			return {
				...state,
				profile: {...state.profile, photos: action.photos} as ProfileType //! временно
			};
		}
		case 'profile/DELETE_POST': {
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId)
			};
		}
		default:
			return state;
	}
}

type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
	addPost: (post: string) => ({ type: 'profile/ADD-POST', newPost: post } as const),
	setUserProfile: (profile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
	savePhotoSuccess: (photos: PhotosType) => ({ type: 'profile/SAVE_PHOTO_SUCCESS', photos } as const),
	setNewMessageTextStatus: (statusText: string) => ({ type: 'profile/SET_STATUS_TEXT', statusText: statusText } as const),
	deletePost: (postId: number) => ({ type: 'profile/DELETE_POST', postId } as const)
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfileThunkCreator = (userId: number | null): ThunkType => async (dispatch) => { //для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let userProfileData = await profileAPI.getUserProfile(userId);
	dispatch(actions.setUserProfile(userProfileData));
}

export const getStatusThuncCreator = (id: number): ThunkType => async (dispatch) => {
	let getStatusData = await profileAPI.getStatus(id);
	dispatch(actions.setNewMessageTextStatus(getStatusData));
}

export const updateTextStatusThuncCreator = (newStatusText: string): ThunkType => async (dispatch) => {
	let updateStatusData = await profileAPI.updateStatus(newStatusText);
	if (updateStatusData.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setNewMessageTextStatus(newStatusText));
	}
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
	let savePhotoData = await profileAPI.savePhoto(file);
	if (savePhotoData.resultCode === 0) {
		dispatch(actions.savePhotoSuccess(savePhotoData.data.photo));
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