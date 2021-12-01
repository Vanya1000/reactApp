import s from './Post.module.css';
const Post = (props) => {

	return (
	<div className={s.item}>
		<img src="https://yt3.ggpht.com/ytc/AKedOLQ6xaEG8GLRO1JWBwMuGk_0kqX26eKrotXaqad76g=s900-c-k-c0x00ffffff-no-rj" alt="" />
		{ props.message}
		<div>
				<span>like</span> {props.likesCount}
		</div>
			<input value="5" />
			<input value="6" />
	</div>
	)
}
export default Post;