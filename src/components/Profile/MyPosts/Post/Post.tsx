import React from "react";
import s from './Post.module.css';

type PropsType = {
	message: string
	likesCount: number
}
//todo фото из стейта нужно
const Post: React.FC<PropsType> = (props) => {
	return (
	<div className={s.item}>
		<img src="https://yt3.ggpht.com/ytc/AKedOLQ6xaEG8GLRO1JWBwMuGk_0kqX26eKrotXaqad76g=s900-c-k-c0x00ffffff-no-rj" alt="" />
		{ props.message}
		<div>
				<span>like</span> {props.likesCount}
		</div>
	</div>
	)
}
export default Post;