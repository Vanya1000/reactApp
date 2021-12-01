import s from './MyPosts.module.css';
import Post from './Post/Post';
const MyPosts = () => {
	return (
	<div className={s.content}>
		<div>
			My posts
			<div>
				<textarea></textarea>
				<button>Add post</button>
			</div>
			<div>
				<Post message='Hi, how a you?' likesCount='15' />
					<Post message='Its my first post!' likesCount='25'/>

			</div>
		</div>
	</div>
	)
}
export default MyPosts;