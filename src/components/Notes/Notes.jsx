import s from './Notes.module.css';
import NotesPost from './NotesPost/NotesPost';
import React from 'react';
import { addNoteActionCreator, updateNewNoteTextActionCreator } from '../../redux/noteReducer';

const Notes = (props) => {
	let notesData = [
		{ id: 1, notes: 'first note'},
		{ id: 2, notes: 'second note'}
	];

	let noteItem = props.state.note.map((notesItem) => <NotesPost note={notesItem.note} />)


	let newNotesElement = React.createRef();


	let keycheck = (event) =>{
		if (event.code == 'Enter' && props.state.newNoteText !== "") {
			addNotes();
		};
	} 


let addNotes = () => {
	props.dispatch(addNoteActionCreator())
	}

	let onNotesTextUpdate = () => {
		let textInputTextarea = newNotesElement.current.value;
		let action = updateNewNoteTextActionCreator(textInputTextarea);
		props.dispatch(action)
	}


	return (
		<div className={s.notes__wrapper}>
			<h2 className={s.notes__title}>My notes</h2>
			<div className={s.notes__visualBlock}>
				{noteItem}
			</div>
			<div className={s.notes__sendBlock}>
				<textarea onKeyDown={keycheck} ref={newNotesElement} onChange={onNotesTextUpdate} value={props.state.newNoteText}></textarea>
				<button onClick={addNotes}>Send</button>
			</div>
		</div>
	)
}
export default Notes;