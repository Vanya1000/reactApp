import React from "react";
import s from './NotesPost.module.css';

type PropsType = {
	note: string
}
const NotesPost: React.FC<PropsType> = (props) => {
	return (
		<div className={s.notes__post}>
			{props.note}
		</div>
	)
}
export default NotesPost;