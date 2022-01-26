import { NavLink, Redirect } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import { addMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		isAuth: state.auth.isAuth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addMessage: (message) => {
			dispatch(addMessageActionCreator(message));
		}
	}
}

//let AuthRedirectComponent = withAuthRedirect(Dialogs)// это наш контейнерный компонет его рисует ithUrlDataContainerComponent, а он рисует ProfileContainer 

//const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)


export default compose (
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect,
) (Dialogs);