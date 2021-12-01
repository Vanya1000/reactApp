import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
	return (
		<div>
			<div>
				<img src="https://static.dw.com/image/18813153_303.jpg" alt="" />
			</div>
			<div>
				ava + discription
			</div>
			<MyPosts />
		</div>
	)
}
export default Profile;