import s from './Notes.module.css';
import NotesPost from './NotesPost/NotesPost';
import React from 'react';
import { addNoteActionCreator, updateNewNoteTextActionCreator } from '../../redux/noteReducer';
import Notes from './Notes';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		notes: state.note.note,
		newNoteText: state.note.newNoteText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNotes: () => {
			dispatch(addNoteActionCreator());
		},
		updateNotesText: (textInputTextarea) => {
			let action = updateNewNoteTextActionCreator(textInputTextarea);
			dispatch(action);
		},
		//keycheck: (event) => {
		//	if (event.code == 'Enter' && state.newNoteText !== "") {
		//		addNotes();
		//	};
		//}
	}
}

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Notes)

export default NotesContainer;