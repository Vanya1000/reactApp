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
	],
	profile: null,
	newStatusText: '-----'
};

const profileReducer = (state = initialState, action) => {
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
				profile: {...state.profile, photos: action.photos}
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

export const addPost = (post) =>
	({ type: ADD_POST, newPost: post });

export const setUserProfile = (profile) =>
	({ type: SET_USER_PROFILE, profile });

export const savePhotoSuccess = (photos) =>
	({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfileThunkCreator = (userId) => async (dispatch) => { //для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let response = await profileAPI.getUserProfile(userId);
	dispatch(setUserProfile(response.data));
}

export const setNewMessageTextStatus = (statusText) =>
	({ type: SET_STATUS_TEXT, statusText: statusText });

export const getStatusThuncCreator = (id) => async (dispatch) => {
	let response = await profileAPI.getStatus(id);
	dispatch(setNewMessageTextStatus(response.data));
}

export const updateTextStatusThuncCreator = (newStatusText) => async (dispatch) => {
	let response = await profileAPI.updateStatus(newStatusText);
	if (response.data.resultCode === 0) {
		dispatch(setNewMessageTextStatus(newStatusText));
	}
}

export const savePhoto = (file) => async (dispatch) => {
	let response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
}

export const saveProfile = (profile) => async (dispatch, getState) => {//?берем из стейта то, что нам нужно. Не запрещено
	const userId = getState().auth.id;
	let response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfileThunkCreator(userId))  
	} else {
		//dispatch(setErrorWrong(true));//! Нужно реализовать отображение ошибки!
	}
}

export const deletePost = (postId) =>
	({ type: DELETE_POST, postId });

export default profileReducer;