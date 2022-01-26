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
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return {
				...state,
				messages: [...state.messages, { id: 5, message: action.newMessage}]
			}
		default:
			return state;
	}
}

export const addMessageActionCreator = (message) =>
	({ type: ADD_MESSAGE, newMessage: message });


export default dialogsReducer;