import s from './Notes.module.css';
import NotesPost from './NotesPost/NotesPost';
import React from 'react';
import { addNoteActionCreator, updateNewNoteTextActionCreator } from '../../redux/noteReducer';

const Notes = (props) => {
	let noteItem = props.notes.map((notesItem) => <NotesPost note={notesItem.note} key={notesItem.id} />)


	let newNotesElement = React.createRef();
/*
	let keycheck = (event) => {
		props.keycheck(event);
	}
	onKeyDown={keycheck}
*/

let addNotes = () => {
	props.addNotes()
	}

	let onNotesTextUpdate = () => {
		let textInputTextarea = newNotesElement.current.value;
		props.updateNotesText(textInputTextarea);
	}


	return (
		<div className={s.notes__wrapper}>
			<h2 className={s.notes__title}>My notes</h2>
			<div className={s.notes__visualBlock}>
				{noteItem}
			</div>
			<div className={s.notes__sendBlock}>
				<textarea  ref={newNotesElement} onChange={onNotesTextUpdate} value={props.newNoteText}></textarea>
				<button onClick={addNotes}>Send</button>
			</div>
		</div>
	)
}
export default Notes;