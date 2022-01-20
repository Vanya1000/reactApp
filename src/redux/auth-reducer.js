import { usersAPI } from "../api/api";
const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth: true
			}
		default:
			return state;
	}
}

export const setAuthUserData = (id, login, email) =>
	({ type: SET_USER_DATA, data: { id, login, email} });

export const getAuthUserData = () => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	return (dispatch) => {
		usersAPI.checksLogin().then(data => {
			if (data.resultCode === 0) {
				dispatch(setAuthUserData(data.data.id, data.data.login, data.data.email));
			}
		})
	}
}

export default authReducer;