const ADD_NOTE = 'ADD-NOTE';
const UPDATE_NEW_NOTE_TEXT = 'note/UPDATE-NEW-NOTE-TEXT'; {/*redux смотрит совпад и анализирует и выполняет action*/ }

type NoteType = {
	id: number
	note: string
}

let initialState = {
	note: [
		{ id: 1, note: 'First note' },
		{ id: 2, note: 'Second note' },
		{ id: 3, note: 'Fack you Tony!' },
		{ id: 4, note: 'What you name?' }
	] as Array<NoteType>,
	newNoteText: ''
};

export type InitialStateType = typeof initialState

const noteReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = AddNoteActionCreatorActionType | UpdateNewNoteTextActionCreatorActionType

type AddNoteActionCreatorActionType = {
	type: typeof ADD_NOTE
}

export const addNoteActionCreator = (): AddNoteActionCreatorActionType => ({ type: ADD_NOTE });

type UpdateNewNoteTextActionCreatorActionType = {
	type: typeof UPDATE_NEW_NOTE_TEXT
	newText: string
}

export const updateNewNoteTextActionCreator = (textInputTextarea: string): UpdateNewNoteTextActionCreatorActionType =>
	({ type: UPDATE_NEW_NOTE_TEXT, newText: textInputTextarea });
export default noteReducer;