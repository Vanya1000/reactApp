import React, { ChangeEvent } from "react";
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import * as axios from 'axios';
import ProfileStatusWithHoocs from './ProfileStatusWithHoocs';
import userPhoto from '../../../assets/images/user.png';
import { useState } from 'react';
import ProfileDataForm from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";

type PropsType = {
	profile: ProfileType 
	isOwner: boolean
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {

	let [editMode, setEditMode] = useState(false);

	if (!props.profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			props.savePhoto(e.target.files[0]);
		}
	}

	
	return (
		<div>
			<div className={s.discriptionBlock}>
				<div>
					<img src={props.profile.photos.large || userPhoto} alt="avatar" />
				</div>
				{props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}
				<ProfileStatusWithHoocs />
				{editMode ? <ProfileDataForm goToExitEditMode={() => { setEditMode(false) }}  {...props} /> : <ProfileData goToEditMode={() => { setEditMode(true) }} {...props}/>}
			</div>
		</div>
	)
}

type ProfileDataPropsType = {
	isOwner: boolean
	profile: ProfileType
	goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode}) => {
	return(
		<div>
			{isOwner && <div>
				<button onClick={goToEditMode}>edit profile</button>
			</div>}
			<div>
				<h1>{profile.fullName}</h1>
			</div>
			<div>
				<h2>About me:</h2>
				<p>{profile.aboutMe}</p>
			</div>
			<div>
				<h2>Contacts:</h2>
				<ul>
					<li>{profile.contacts.facebook}</li>
					<li>{profile.contacts.website}</li>
					<li>{profile.contacts.vk}</li>
					<li>{profile.contacts.twitter}</li>
					<li>{profile.contacts.instagram}</li>
					<li>{profile.contacts.youtube}</li>
					<li>{profile.contacts.github}</li>
					<li>{profile.contacts.mainLink}</li>
				</ul>
			</div>
			<div>
				<h2>Looking for a job?</h2>
				<p>{profile.lookingForAJob ? 'yes' : 'no'}</p>
				<h2>Looking for a job description:</h2>
				<p>{profile.lookingForAJobDescription}</p>
			</div>
		</div>
	)
}




export default ProfileInfo;
