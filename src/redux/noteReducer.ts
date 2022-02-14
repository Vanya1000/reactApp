import { InferActionTypes } from "./redux-store";

export type NoteType = {
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
		case 'note/ADD-NOTE': {
			return {
				...state,
				note: [...state.note, { id: 5, note: state.newNoteText }],
				newNoteText: ''
			}
		}
		case 'note/UPDATE-NEW-NOTE-TEXT': {
			return {
				...state,
				newNoteText: action.newText
			}
		}
		default:
			return state;
	}
}

type ActionsTypes = InferActionTypes<typeof actions>


export const actions = {
	addNoteActionCreator: () => ({ type: 'note/ADD-NOTE' } as const),
	updateNewNoteTextActionCreator: (textInputTextarea: string) => ({ type: 'note/UPDATE-NEW-NOTE-TEXT', newText: textInputTextarea } as const)
}

export default noteReducer;