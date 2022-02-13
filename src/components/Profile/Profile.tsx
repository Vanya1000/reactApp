import React from "react";
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from "../../types/types";

type PropsType = {
	isOwner: boolean
	profile: ProfileType
	saveProfile: (profile: ProfileType) => void
	savePhoto: (file: File) => void
}

const Profile: React.FC<PropsType> = (props) => {
	return (
		<div className={s.pad}>
			<ProfileInfo saveProfile={props.saveProfile} isOwner={props.isOwner} profile={props.profile} savePhoto={props.savePhoto} />
			<MyPostsContainer />
		</div>
	)
}
export default Profile;