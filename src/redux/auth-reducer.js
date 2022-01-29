import { authAPI, usersAPI } from "../api/api";
const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_ERROR_WRONG = 'auth/SET_ERROR_WRONG';

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
	({ type: SET_USER_DATA, payload: { id, login, email, isAuth } });

export const setErrorWrong = (isWrong) =>
	({ type: SET_ERROR_WRONG, data: isWrong });

export const getAuthUserData = () => async (dispatch) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let response = await authAPI.checksLogin();// дожидаемся именно промиса В респонсе будет сидеть результат которым зарезолвится промис 
	if (response.data.resultCode === 0) {
		let { id, login, email } = response.data.data
		dispatch(setAuthUserData(id, login, email, true));
	}
}


export const loginTC = (email, password, rememberMe) => async (dispatch) => {
	let response = await authAPI.login(email, password, rememberMe);
	if (response.data.resultCode === 0) {
		dispatch(getAuthUserData());
		dispatch(setErrorWrong(false));
	} else {
		dispatch(setErrorWrong(true));
	}
}


export const logout = () => async (dispatch) => {
	let response = await authAPI.logout()
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

export default authReducer;