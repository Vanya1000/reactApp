import s from './Notes.module.css';
import NotesPost from './NotesPost/NotesPost';
import React from 'react';
import { actions } from '../../redux/noteReducer';
import Notes, { DispatchPropsType, MapPropsType} from './Notes';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

const { addNoteActionCreator, updateNewNoteTextActionCreator } = actions

const mapStateToProps = (state: AppStateType) => {
	return {
		notes: state.note.note,
		newNoteText: state.note.newNoteText
	}
}



const NotesContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addNoteActionCreator, updateNewNoteTextActionCreator})(Notes)

export default NotesContainer;