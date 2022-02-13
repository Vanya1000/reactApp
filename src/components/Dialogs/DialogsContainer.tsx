import React from 'react';
import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';


const mapStateToProps = (state: AppStateType) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		isAuth: state.auth.isAuth
	}
}


export default compose<React.ComponentType>(// <React.ComponentType> это для react lazy
	connect(mapStateToProps, {...actions}),
	withAuthRedirect,
) (Dialogs);