import { usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST'; {/*action type*/ } {/*используем вместо строк что бы не опечататься*/ }
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_NEW_MESSAGE_STATUS = 'UPDATE_NEW_MESSAGE_STATUS';
//const SET_STATUS_TEXT = 'SET_STATUS_TEXT';

let initialState = {
	posts: [
		{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
		{ id: 2, message: 'Its my first post!', likesCount: 2 }
	],
	newPostText: '',
	profile: null,
	newStatusText: '______'
};

const profileReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_POST: {
			let body = state.newPostText;
			return { 
				...state,
				posts: [...state.posts, { id: 5, message: body, likesCount: 0 }],
				newPostText: ''
			};
		}
		case UPDATE_NEW_POST_TEXT: {
			return { 
				...state, 
				newPostText: action.newText
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			};
		}
		case UPDATE_NEW_MESSAGE_STATUS: {
			return {
				...state,
				newStatusText: action.newStatusText
			};
		}
		default:
			return state;
	}
}

export const addPostActionCreator = () => ({ type: ADD_POST });
{/*Вспомогательная функция которая помогает не ошибиться в созд action */ }

export const updateNewPostTextActionCreator = (textCh) =>
	({ type: UPDATE_NEW_POST_TEXT, newText: textCh });
	
export const setUserProfile = (profile) =>
	({ type: SET_USER_PROFILE, profile });


export const getUserProfileThunkCreator = (userId) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		usersAPI.getUserProfile(userId).then(data => {
			dispatch(setUserProfile(data));
		})
	}
}

export const updateNewMessageTextStatus = (newText) =>
	({ type: UPDATE_NEW_MESSAGE_STATUS, newStatusText: newText });

export const setTextStatusThuncCreator = (newStatusText) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		usersAPI.setStatus(newStatusText)
	}
}

export const getStatusThuncCreator = (id) => {
	return (dispatch) => {
		usersAPI.getStatus(id).then(data => {
			dispatch(updateNewMessageTextStatus(data));
		})
	}
}

export default profileReducer;