import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogsReducer";
import noteReducer from "./noteReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer.ts";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	note: noteReducer,
	usersPage: usersReducer,
	app: appReducer,
	auth: authReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;
