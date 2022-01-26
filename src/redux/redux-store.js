import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import noteReducer from "./noteReducer";
import usersReducer from "./usersReducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	note: noteReducer,
	usersPage: usersReducer,
	auth: authReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
