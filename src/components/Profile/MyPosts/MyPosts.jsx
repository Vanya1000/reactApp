import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/state';



const MyPosts = (props) => {
	let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

	let newPostElement = React.createRef();

	let addPost = () => {
		props.dispatch(addPostActionCreator());
	};

	let onPostChange = (text) => {
		{/*Получ value и вызываем функцию из state и передаем ей value*/ }
		let textCh = newPostElement.current.value;
		let action = updateNewPostTextActionCreator(textCh);
		props.dispatch(action);
	}

	return (
		<div className={s.postsBlock}>
			<div>
				<h3>
					My posts
				</h3>
				<div>
					<div>
						<textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />{/*В момент события onChange вызываем функцию*/}
					</div>
					<div>
						<button onClick={addPost}>Add post</button>
					</div>
				</div>
				<div className={s.messageBlock}>
					{postsElement}
				</div>
			</div>
		</div>
	)
}
export default MyPosts;