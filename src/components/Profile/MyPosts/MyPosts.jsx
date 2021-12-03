import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
	let postsElement = props.posts.map( p => <Post message={p.message} likesCount={p.likesCount} />)

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
					{postsElement}
				</div>
			</div>
		</div>
	)
}
export default MyPosts;