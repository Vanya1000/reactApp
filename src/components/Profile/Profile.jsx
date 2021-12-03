import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {
	return (
		<div className={s.pad}>
			<ProfileInfo />
			<MyPosts posts={props.posts} />
		</div>
	)
}
export default Profile;