import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReducer';



const Dialogs = (props) => {
	let dialogsElements = props.dialogs.map((d) => <DialogItem id={d.id} key={d.id} name={d.name} />)
	let messagesElements = props.messages.map((m) => <Message message={m.message} key={m.id} />)
	let newMessage = React.createRef();

	let addMessage = () => {
		props.addMessage();
	};

	let onMessageChange = () => {
		let text = newMessage.current.value;
		props.onMessageChange(text);
	}

	return (
		<div className={s.dialogs}>
			<div className={s.dialogs__item}>
				{dialogsElements}	
			</div>
			<div className={s.messages}>
				{messagesElements}
			</div>
			<div className={s.dialogInput}>
				<textarea ref={newMessage} onChange={onMessageChange} value={props.newMessageText} />
				<button onClick={addMessage}>Send</button>
			</div>
		</div>
	)
}

export default Dialogs;