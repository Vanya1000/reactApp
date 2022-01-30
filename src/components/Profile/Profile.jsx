import React from "react";
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';



const Profile = (props) => {
	return (
		<div className={s.pad}>
			<ProfileInfo isOwner={props.isOwner} profile={props.profile} savePhoto={props.savePhoto} />
			<MyPostsContainer />
		</div>
	)
}
export default Profile;