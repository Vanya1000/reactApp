import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

const DialogItem = (props) => {
	return(
		<div className={s.dialog + ' ' + s.active}>
			<NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
		</div>
	)
}
const Message = (props) => {
	return (
		<div className={s.message}>{props.message}</div>
	)
}

const Dialogs = (props) => {
	let dialogsData = [
		{ id: 1, name: 'Ivan' },
		{ id: 2, name: 'Alex' },
		{ id: 3, name: 'Kesha' },
		{ id: 4, name: 'Inokentiy' }
	];

	let messagesData = [
		{ id: 1, message: 'What you name?' },
		{ id: 2, message: 'Tony' },
		{ id: 3, message: 'Fack you Tony!' },
		{ id: 4, message: 'What you name?' }
	];
	
	return (
		<div className={s.dialogs}>
			<div className={s.dialogs__item}>
				<DialogItem id={dialogsData[0].id} name={dialogsData[0].name} />
				<DialogItem id={dialogsData[1].id} name={dialogsData[1].name} />
				<DialogItem id={dialogsData[2].id} name={dialogsData[2].name} />
				<DialogItem id={dialogsData[3].id} name={dialogsData[3].name} />	
			</div>
			<div className={s.messages}>
				<Message message={messagesData[0].message} />
				<Message message={messagesData[1].message} />
				<Message message={messagesData[2].message} />
				<Message message={messagesData[3].message} />
			</div>
		</div>
	)
}

export default Dialogs