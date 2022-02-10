import { InferActionTypes } from "./redux-store";

type DialogType = {
	id: number
	name: string
}

type MessageType = {
	id: number
	message: string
}

let initialState = {
	dialogs: [
		{ id: 1, name: 'Ivan' },
		{ id: 2, name: 'Alex' },
		{ id: 3, name: 'Kesha' },
		{ id: 4, name: 'Dino' }
	] as Array<DialogType>,
	messages: [
		{ id: 1, message: 'What you name?' },
		{ id: 2, message: 'Tony' },
		{ id: 3, message: 'Fack you Tony!' },
		{ id: 4, message: 'What you name?' }
	] as Array<MessageType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'dialogs/UPDATE-NEW-MESSAGE-TEXT':
			return {
				...state,
				messages: [...state.messages, { id: 5, message: action.newMessage }]
			}
		default:
			return state;
	}
}

type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
	addMessageActionCreator: (message: string) => ({ type: 'dialogs/UPDATE-NEW-MESSAGE-TEXT', newMessage: message } as const)
}

export default dialogsReducer;


