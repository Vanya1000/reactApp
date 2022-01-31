import React from "react";
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import * as axios from 'axios';
import ProfileStatusWithHoocs from './ProfileStatusWithHoocs';
import userPhoto from '../../../assets/images/user.png';
import { useState } from 'react';
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

	let [editMode, setEditMode] = useState(false);

	if (!props.profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0]);
		}
	}

	
	return (
		<div>
			{/* <div className={s.image}>
				<img src="https://static.dw.com/image/18813153_303.jpg" alt="" />
			</div> */}
			<div className={s.discriptionBlock}>
				<div>
					<img src={props.profile.photos.large || userPhoto} alt="avatar" />
				</div>
				{props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}
				<ProfileStatusWithHoocs />
				{editMode ? <ProfileDataForm goToExitEditMode={() => { setEditMode(false) }}  {...props} /> : <ProfileData  goToEditMode={() => { setEditMode(true) }} {...props} />}
			</div>
		</div>
	)
}

const ProfileData = (props) => {
	return(
		<div>
			{props.isOwner && <div>
				<button onClick={props.goToEditMode}>edit profile</button>
			</div>}
			<div>
				<h1>{props.profile.fullName}</h1>
			</div>
			<div>
				<h2>About me:</h2>
				<p>{props.profile.aboutMe}</p>
			</div>
			<div>
				<h2>Contacts:</h2>
				<ul>
					<li>{props.profile.contacts.facebook}</li>
					<li>{props.profile.contacts.website}</li>
					<li>{props.profile.contacts.vk}</li>
					<li>{props.profile.contacts.twitter}</li>
					<li>{props.profile.contacts.instagram}</li>
					<li>{props.profile.contacts.youtube}</li>
					<li>{props.profile.contacts.github}</li>
					<li>{props.profile.contacts.mainLink}</li>
				</ul>
			</div>
			<div>
				<h2>Looking for a job?</h2>
				<p>{props.profile.lookingForAJob ? 'yes' : 'no'}</p>
				<h2>Looking for a job description:</h2>
				<p>{props.profile.lookingForAJobDescription}</p>
			</div>
		</div>
	)
}




export default ProfileInfo;
