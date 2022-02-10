import { getAuthUserData } from "./auth-reducer";
import { InferActionTypes } from "./redux-store";
//const INITIALIZED_SUCCESS = 'auth/INITIALIZED_SUCCES'; В  TS можем избавиться от констант поместив в case и добавив as const в actions{}



let initialState = {
	initialized: false
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => { // func получает и возвращает InitialStateType
	switch (action.type) {
		case 'auth/INITIALIZED_SUCCES':
			return {
				...state,
				initialized: true
			}
		default:
			return state;
	}
}

type ActionsTypes = InferActionTypes<typeof actions>



export const actions = {
	initializedSuccess: () => ({ type: 'auth/INITIALIZED_SUCCES' } as const)
}


//! Хрень какая то как getAuthUserData()  решение 10 видео 1:13:45 нет там решения... короче хз как в видео это не сделали

export const initializeApp = () => {
	return (dispatch:any) => {
		let promise = dispatch(getAuthUserData());// вернули промис из auth-reducer
		Promise.all([promise]).then(() => {// если несколько 
			dispatch(actions.initializedSuccess());
		});
		
	}
}

export default appReducer;