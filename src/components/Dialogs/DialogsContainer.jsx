import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';



const DialogsContainer = () => {
	return (
		<StoreContext.Consumer>
			{(store) =>{
				let state = store.getState();

				let addMessage = () => {
					store.dispatch(addMessageActionCreator());
				};

				let onMessageChange = (text) => {
					let action = updateNewMessageTextActionCreator(text)
					store.dispatch(action);
				}
				return <Dialogs addMessage={addMessage}
					onMessageChange={onMessageChange}
					dialogs={state.dialogsPage.dialogs}
					messages={state.dialogsPage.messages}
					newMessageText={state.dialogsPage.newMessageText} />
			}}
		</StoreContext.Consumer>
	)
}

export default DialogsContainer;