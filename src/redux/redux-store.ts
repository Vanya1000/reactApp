import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import appReducer from "./appReducer";
import authReducer from "./auth-reducer";
import chatReducer from "./chat-reducer";
import dialogsReducer from "./dialogsReducer";
import noteReducer from "./noteReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";

let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	note: noteReducer,
	usersPage: usersReducer,
	app: appReducer,
	auth: authReducer,
	chat: chatReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType> // спец команда TS



/* type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export  type InferActionTypes<T extends {[key: string]: (...arg: any[])=>any}> = ReturnType<PropertiesTypes<T>> */
export  type InferActionTypes<T> = T extends {[key: string]: (...arg: any[])=> infer U } ? U : never// для reducer


export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>// вынесли вверх


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;
