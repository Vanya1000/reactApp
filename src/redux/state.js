const ADD_POST = 'ADD-POST'; {/*action type*/ } {/*используем вместо строк что бы не опечататься*/ }
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'; {/*redux смотрит совпад и анализирует и выполняет action*/ }

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
		if (action.type ==='ADD-POST') {
			let newPosts = {
				id: 5,
				message: this._state.profilePage.newPostText,
				likesCount: 0
			};
			this._state.profilePage.posts.push(newPosts);
			this._state.profilePage.newPostText = '';
			this._callSubscriber(this._state);
		} else if (action.type === 'UPDATE-NEW-POST-TEXT') {
			this._state.profilePage.newPostText = action.newText;
			this._callSubscriber(this._state);
		} else if (action.type === 'ADD-MESSAGE') {
			let newMessage = {
				id: 5,
				message: this._state.dialogsPage.newMessageText,
			};
			this._state.dialogsPage.messages.push(newMessage);
			this._state.dialogsPage.newMessageText = '';
			this._callSubscriber(this._state);
		} else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
			this._state.dialogsPage.newMessageText = action.newText;
			this._callSubscriber(this._state);
		}
	}
}

export const addPostActionCreator = () => ({ type: ADD_POST });
{/*Вспомогательная функция которая помогает не ошибиться в созд action */ }

export const updateNewPostTextActionCreator = (textCh) => 
({type: UPDATE_NEW_POST_TEXT, newText: textCh});

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => 
	({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });

export default store;
window.store = store;