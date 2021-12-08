import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';

const MyPosts = (props) => {
	let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

	let newPostElement = React.createRef();

	let addPost = () => {
		props.addPost();
	};

	let onPostChange = (text) => {
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