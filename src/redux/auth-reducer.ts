import { authAPI, securityAPI, usersAPI } from "../api/api";
const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_ERROR_WRONG = 'auth/SET_ERROR_WRONG';
const GET_CHAPTCHA_URL_SUCCESS = 'auth/GET_CHAPTCHA_URL_SUCCESS';

/* export type InitialStateType2 = {
	id: number | null,
	login: string | null,
	email: string | null,
	isAuth: boolean,
	isWrong: boolean,
	captchaUrl: string | null
} */

let initialState = {
	id: null as number | null, // воспринимай null как
	login: null as string | null,
	email: null as string | null,
	isAuth: false,
	isWrong: false,
	captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState; // TS определи сам тип этого initialState и создай его динамически на лету.

const authReducer = (state = initialState, action: any): InitialStateType => {
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
		case GET_CHAPTCHA_URL_SUCCESS:
			return {
				...state,
				captchaUrl: action.payload
			}
		default:
			return state;
	}
}
type SetAuthUserDataActionPayloadType = {
	id: number | null
	login: string | null
	email: string | null
	isAuth: boolean
}
type SetAuthUserDataType = {
	type: typeof SET_USER_DATA,
	payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataType =>
	({ type: SET_USER_DATA, payload: { id, login, email, isAuth } });

type getCaptchaUrlSuccessType = {
	type: typeof GET_CHAPTCHA_URL_SUCCESS
	payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessType =>
	({ type: GET_CHAPTCHA_URL_SUCCESS, payload: {captchaUrl} });

type setErrorWrongType = {
	type: typeof SET_ERROR_WRONG
	data: { isWrong: boolean }
}

export const setErrorWrong = (isWrong: boolean): setErrorWrongType =>
	({ type: SET_ERROR_WRONG, data: {isWrong} });

export const getAuthUserData = () => async (dispatch: any) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let response = await authAPI.checksLogin();// дожидаемся именно промиса В респонсе будет сидеть результат которым зарезолвится промис 
	if (response.data.resultCode === 0) {
		let { id, login, email } = response.data.data
		dispatch(setAuthUserData(id, login, email, true));
	}
}


export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: any ) => async (dispatch: any) => {//!!! captcha any
	let response = await authAPI.login(email, password, rememberMe, captcha);
	if (response.data.resultCode === 0) {
		dispatch(getAuthUserData());
		dispatch(setErrorWrong(false));
	} else if (response.data.resultCode === 10) {
		dispatch(getCaptchaUrl());
	}
	else {
		dispatch(setErrorWrong(true));
	}
}

export const getCaptchaUrl = () => async (dispatch:any) => {
	let response = await securityAPI.getCaptcha();
	const captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch:any) => {
	let response = await authAPI.logout()
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

export default authReducer;