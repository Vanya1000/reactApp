import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { useForm } from "react-hook-form";



const Dialogs = (props) => {
	let dialogsElements = props.dialogs.map((d) => <DialogItem id={d.id} key={d.id} name={d.name} />)
	let messagesElements = props.messages.map((m) => <Message message={m.message} key={m.id} />)

	return (
		<div className={s.dialogs}>
			<div className={s.dialogs__item}>
				{dialogsElements}	
			</div>
			<div className={s.messages}>
				{messagesElements}
			</div>
			<div className={s.dialogInput}>
				<AddMessageForm {...props} />
			</div>
		</div>
	)
}


const AddMessageForm = (props) => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const onSubmit = data => {
		props.addMessage(data.message);
		reset();
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
				<textarea  {...register("message")} />
			<input type="submit" value="send" />
		</form>
	)
}

export default Dialogs;