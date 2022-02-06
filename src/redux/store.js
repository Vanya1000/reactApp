import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer.ts";

let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
				{ id: 2, message: 'Its my first post!', likesCount: 2 }
			],
			newPostText: ''
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Ivan' },
				{ id: 2, name: 'Alex' },
				{ id: 3, name: 'Kesha' },
				{ id: 4, name: 'Dino' }
			],
			messages: [
				{ id: 1, message: 'What you name?' },
				{ id: 2, message: 'Tony' },
				{ id: 3, message: 'Fack you Tony!' },
				{ id: 4, message: 'What you name?' }
			],
			newMessageText: ''
		},
		sidebar: {
			friends: [
				{ id: 1, name: 'Alex' },
				{ id: 2, name: 'Kesha' },
				{ id: 3, name: 'Dino' },
			]
		}
	},
	_callSubscriber() {
		{/*для перерисовки*/ }
		console.log('State changed');
	},

	getState () {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch (action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);{/*новый profilePage присваивается переработанный*/}
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action); {/*state обновиться блягодаря этому reducer*/ }
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);/*мы уведомляли подписчиков и передавали обновл state */
	}
}

export default store;
window.store = store;