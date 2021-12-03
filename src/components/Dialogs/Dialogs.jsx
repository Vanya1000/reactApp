import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';



const Dialogs = (props) => {
	let dialogsElements = props.state.dialogs.map((d) => <DialogItem id={d.id} name={d.name} />)
	let messagesElements = props.state.messages.map((m) => <Message message={m.message} />)
	
	return (
		<div className={s.dialogs}>
			<div className={s.dialogs__item}>
				{dialogsElements}	
			</div>
			<div className={s.messages}>
				{messagesElements}
			</div>
		</div>
	)
}

export default Dialogs