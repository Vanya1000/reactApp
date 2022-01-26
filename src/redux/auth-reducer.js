import { authAPI, usersAPI } from "../api/api";
const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR_WRONG = 'SET_ERROR_WRONG';

let initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
	isWrong: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
			}
		case SET_ERROR_WRONG:
			return {
				...state,
				isWrong: action.data
			}
		default:
			return state;
	}
}

export const setAuthUserData = (id, login, email, isAuth) =>
	({ type: SET_USER_DATA, payload: { id, login, email, isAuth} });

export const setErrorWrong = (isWrong) =>
	({ type: SET_ERROR_WRONG , data: isWrong});

export const getAuthUserData = () => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		authAPI.checksLogin().then(data => {
			let {id, login, email} = data.data
			if (data.resultCode === 0) {
				dispatch(setAuthUserData(id, login, email, true));
			}
		})
	}
}

export const loginTC = (email, password, rememberMe) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		authAPI.login(email, password, rememberMe).then(data => {
			if (data.resultCode === 0) {
				dispatch(getAuthUserData());
				dispatch(setErrorWrong(false));
			} else {
				dispatch(setErrorWrong(true));
			}
		})
	}
}

export const logout = () => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		authAPI.logout().then(data => {
			if (data.resultCode === 0) {
				dispatch(setAuthUserData(null, null, null, false));
			}
		})
	}
}

export default authReducer;