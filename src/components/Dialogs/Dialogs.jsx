import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/state';



const Dialogs = (props) => {
	let dialogsElements = props.state.dialogs.map((d) => <DialogItem id={d.id} name={d.name} />)
	let messagesElements = props.state.messages.map((m) => <Message message={m.message} />)
	let newMessage = React.createRef();
	let addMessage = () => {
		props.dispatch(addMessageActionCreator());
	};

	let onMessageChange = () => {
		let text = newMessage.current.value;
		let action = updateNewMessageTextActionCreator(text)
		props.dispatch(action);
	}

	console.log(props);
	return (
		<div className={s.dialogs}>
			<div className={s.dialogs__item}>
				{dialogsElements}	
			</div>
			<div className={s.messages}>
				{messagesElements}
			</div>
			<div className={s.dialogInput}>
				<textarea ref={newMessage} onChange={onMessageChange} value={props.state.newMessageText} />
				<button onClick={addMessage}>Отправить</button>
			</div>
		</div>
	)
}

export default Dialogs