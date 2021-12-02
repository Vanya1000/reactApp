import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
	let postData = [
		{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
		{ id: 1, message: 'Its my first post!', likesCount: 25 }
	];
	return (
		<div className={s.postsBlock}>
			<div>
				<h3>
					My posts
				</h3>
				<div>
					<div>
						<textarea></textarea>
					</div>
					<div>
						<button>Add post</button>
					</div>
				</div>
				<div className={s.messageBlock}>
					<Post message={postData[0].message} likesCount={postData[0].likesCount} />
					<Post message={postData[1].message} likesCount={postData[1].likesCount} />
				</div>
			</div>
		</div>
	)
}
export default MyPosts;