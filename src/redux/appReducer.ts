import { authAPI, usersAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";
const INITIALIZED_SUCCESS = 'auth/INITIALIZED_SUCCES';

export type InitialStateType = {
	initialized: boolean
}

let initialState: InitialStateType = {
	initialized: false
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => { // func получает и возвращает InitialStateType
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}
		default:
			return state;
	}
}

type ActionsTypes = initializedSuccessActionType

type initializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS //ts typeof на этапе компиляции выводит в тип значение константы
}

export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

//! Хрень какая то как getAuthUserData() импортировать?

export const initializeApp = () => {
	return (dispatch:any) => {
		let promise = dispatch(getAuthUserData());// вернули промис из auth-reducer
		Promise.all([promise]).then(() => {// если несколько 
			dispatch(initializedSuccess());
		});
		
	}
}

export default appReducer;