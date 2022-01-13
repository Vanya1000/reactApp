import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		newMessageText: state.dialogsPage.newMessageText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addMessage: () => {
			dispatch(addMessageActionCreator());
		},
		onMessageChange: (text) => {
			let action = updateNewMessageTextActionCreator(text);
			dispatch(action);
		}
	}
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


export default DialogsContainer;