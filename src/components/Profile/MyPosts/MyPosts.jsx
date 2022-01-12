import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';



const MyPosts = (props) => {
	let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

	let newPostElement = React.createRef();

	let onAddPost = () => {
		props.addPost();
	};

	let onPostChange = (text) => {
		{/*Получ value и вызываем функцию из state и передаем ей value*/ }
		let textCh = newPostElement.current.value;
		props.updateNewPostText(textCh);
	}

	return (
		<div className={s.postsBlock}>
			<div>
				<h3>
					My posts
				</h3>
				<div>
					<div>
						<textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
					</div>
					<div>
						<button onClick={onAddPost}>Add post</button>
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