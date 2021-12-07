import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.css';

const DialogItem = (props) => {
	return(
		<div className={s.nameChat}>
			<NavLink to={"/dialogs/" + props.id}><img src="https://yt3.ggpht.com/ytc/AKedOLQ6xaEG8GLRO1JWBwMuGk_0kqX26eKrotXaqad76g=s900-c-k-c0x00ffffff-no-rj" alt="" />{props.name}</NavLink>
		</div>
	)
}

export default DialogItem