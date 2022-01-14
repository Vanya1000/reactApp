import React from "react";
import s from './NotesPost.module.css';

const NotesPost = (props) => {
	return (
		<div className={s.notes__post}>
			{props.note}
		</div>
	)
}
export default NotesPost;