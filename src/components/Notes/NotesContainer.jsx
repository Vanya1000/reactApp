import s from './Notes.module.css';
import NotesPost from './NotesPost/NotesPost';
import React from 'react';
import { addNoteActionCreator, updateNewNoteTextActionCreator } from '../../redux/noteReducer';
import Notes from './Notes';
import StoreContext from '../../StoreContext';

const NotesContainer = (props) => {

	return (
		<StoreContext.Consumer>
			{(store) =>{
				let state = store.getState()

				let keycheck = (event) => {
					if (event.code == 'Enter' && state.newNoteText !== "") {
						addNotes();
					};
				}

				let addNotes = () => {
					store.dispatch(addNoteActionCreator())
				}

				let onNotesTextUpdate = (textInputTextarea) => {
					let action = updateNewNoteTextActionCreator(textInputTextarea);
					store.dispatch(action)
				}
				return <Notes
					addNotes={addNotes}
					updateNotesText={onNotesTextUpdate}
					keycheck={keycheck}
					notes={state.note.note}
					newNoteText={state.note.newNoteText} />
			}}
		</StoreContext.Consumer>
	)
}
export default NotesContainer;