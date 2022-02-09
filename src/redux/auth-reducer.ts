import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { authAPI, ResultCodesEnum, securityAPI, usersAPI, ResultCodeForCaptcha } from "../api/api";
import { AppStateType } from "./redux-store";
const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_ERROR_WRONG = 'auth/SET_ERROR_WRONG';
const GET_CHAPTCHA_URL_SUCCESS = 'auth/GET_CHAPTCHA_URL_SUCCESS';

let initialState = {
	id: null as number | null, // воспринимай null как
	login: null as string | null,
	email: null as string | null,
	isAuth: false,
	isWrong: false,
	captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState; // TS определи сам тип этого initialState и создай его динамически на лету.

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
			}
		case SET_ERROR_WRONG:
			return {
				...state,
				isWrong: action.data.isWrong
			}
		case GET_CHAPTCHA_URL_SUCCESS:
			return {
				...state,
				captchaUrl: action.payload.captchaUrl
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

type ActionsTypes = SetAuthUserDataType | getCaptchaUrlSuccessType | setErrorWrongType

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


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = ():ThunkType => async (dispatch) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let checksLoginData = await authAPI.checksLogin();// дожидаемся именно промиса В респонсе будет сидеть результат которым зарезолвится промис 
	if (checksLoginData.resultCode === ResultCodesEnum.Success) {
		let { id, login, email } = checksLoginData.data
		dispatch(setAuthUserData(id, login, email, true));
	}
}


export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {//!!! captcha any
	let loginData = await authAPI.login(email, password, rememberMe, captcha);
	if (loginData.resultCode === 0) {
		dispatch(getAuthUserData());
		dispatch(setErrorWrong(false));
	} else if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
		dispatch(getCaptchaUrl());
	}
	else {
		dispatch(setErrorWrong(true));
	}
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	let captchaData = await securityAPI.getCaptcha();
	const captchaUrl = captchaData.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout()
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

export default authReducer;