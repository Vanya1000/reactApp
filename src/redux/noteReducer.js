const ADD_NOTE = 'ADD-NOTE';
const UPDATE_NEW_NOTE_TEXT = 'UPDATE-NEW-NOTE-TEXT'; {/*redux смотрит совпад и анализирует и выполняет action*/ }

let initialState = {
	note: [
		{ id: 1, note: 'First note' },
		{ id: 2, note: 'Second note' },
		{ id: 3, note: 'Fack you Tony!' },
		{ id: 4, note: 'What you name?' }
	],
	newNoteText: ''
};

const noteReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_NOTE: {
			return {
				...state,
				note: [...state.note, { id: 5, note: state.newNoteText }],
				newNoteText: ''
			}
		}
		case UPDATE_NEW_NOTE_TEXT: {
			return {
				...state,
				newNoteText: action.newText
			}
		}
		default:
			return state;
	}
}

export const addNoteActionCreator = () => ({ type: ADD_NOTE });

export const updateNewNoteTextActionCreator = (textInputTextarea) =>
	({ type: UPDATE_NEW_NOTE_TEXT, newText: textInputTextarea });
export default noteReducer;