import s from './Profile.module.css';
const Profile = () => {
	return <div className={s.content}>
		<div>
			<img src="https://static.dw.com/image/18813153_303.jpg" alt="" />
		</div>
		<div>
			ava + discription
		</div>
		<div>
			My posts
			<div>
				New post
			</div>
			<div>
				<div>
					post 1
				</div>
				<div>
					post 2
				</div>
			</div>
		</div>
	</div>
}
export default Profile;