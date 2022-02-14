import s from './Notes.module.css';
import NotesPost from './NotesPost/NotesPost';
import React from 'react';
import { NoteType } from '../../redux/noteReducer';

export type MapPropsType = {
	newNoteText: string
	notes: Array<NoteType>
}

export type DispatchPropsType = {
	addNoteActionCreator: () => void
	updateNewNoteTextActionCreator: (textInputTextarea: string) => void
}

const Notes: React.FC<MapPropsType & DispatchPropsType> = (props) => {
	let noteItem = props.notes.map((notesItem) => <NotesPost note={notesItem.note} key={notesItem.id} />)


	let newNotesElement = React.createRef<HTMLTextAreaElement>();

let addNotes = () => {
	props.addNoteActionCreator()
	}

	let onNotesTextUpdate = () => {
		let textInputTextarea = newNotesElement.current!.value;
		props.updateNewNoteTextActionCreator(textInputTextarea);
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