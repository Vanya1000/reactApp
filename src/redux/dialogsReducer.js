const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'; {/*redux смотрит совпад и анализирует и выполняет action*/ }

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: 5,
				message: state.newMessageText
			};
			state.messages.push(newMessage);
			state.newMessageText = '';
			return state;
		case UPDATE_NEW_MESSAGE_TEXT:
			state.newMessageText = action.newText;
			return state;
		default:
			return state;
	}
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageTextActionCreator = (text) =>
	({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });

export default dialogsReducer;