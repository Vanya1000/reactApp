import { authAPI } from './../api/auth-api';
import { usersAPI } from './../api/user-api';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { AppStateType, BaseThunkType, InferActionTypes } from "./redux-store";
import { securityAPI } from '../api/security-api';


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
		case 'auth/SET_USER_DATA':
			return {
				...state,
				...action.payload,
			}
		case 'auth/SET_ERROR_WRONG':
			return {
				...state,
				isWrong: action.data.isWrong
			}
		case 'auth/GET_CHAPTCHA_URL_SUCCESS':
			return {
				...state,
				captchaUrl: action.payload.captchaUrl
			}
		default:
			return state;
	}
}

type ActionsTypes = InferActionTypes<typeof actions>


export const actions = {
	setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({ type: 'auth/SET_USER_DATA', payload: { id, login, email, isAuth } } as const),
	getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'auth/GET_CHAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const),
	setErrorWrong: (isWrong: boolean) => ({ type: 'auth/SET_ERROR_WRONG', data: { isWrong } } as const)
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const getAuthUserData = ():ThunkType => async (dispatch) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	let checksLoginData = await authAPI.checksLogin();// дожидаемся именно промиса В респонсе будет сидеть результат которым зарезолвится промис 
	if (checksLoginData.resultCode === ResultCodesEnum.Success) {
		let { id, login, email } = checksLoginData.data
		dispatch(actions.setAuthUserData(id, login, email, true));
	}
}


export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {//!!! captcha any
	let loginData = await authAPI.login(email, password, rememberMe, captcha);
	if (loginData.resultCode === 0) {
		dispatch(getAuthUserData());
		dispatch(actions.setErrorWrong(false));
	} else if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
		dispatch(getCaptchaUrl());
	}
	else {
		dispatch(actions.setErrorWrong(true));
	}
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	let captchaData = await securityAPI.getCaptcha();
	const captchaUrl = captchaData.url;
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout()
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
}

export default authReducer;