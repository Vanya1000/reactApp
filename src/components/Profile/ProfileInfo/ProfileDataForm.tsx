import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ContactsType, ProfileType } from "../../../types/types";

type PropsType = {
	profile: ProfileType
	saveProfile: (profile: ProfileType) => void
	goToExitEditMode: () => void
}
//todo типизация вычисляемых свойств

const ProfileDataForm: React.FC<PropsType> = ({ saveProfile, goToExitEditMode, profile}) => {
	const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProfileType>();
	const onSubmit = (data: ProfileType) => {
		saveProfile(data);
		goToExitEditMode();
		console.log(data.contacts);
	}
	setValue('fullName', profile.fullName)
	setValue('aboutMe', profile.aboutMe)
	setValue('lookingForAJob', profile.lookingForAJob)
	setValue('lookingForAJobDescription', profile.lookingForAJobDescription)
	// @ts-ignore
	Object.keys(profile.contacts).forEach((key) => { setValue(`contacts.${key}`, profile.contacts[key as keyof ContactsType])})
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<button>save</button>
			</div>
			<div>
				<h2>Full Name:</h2>
				<input type="text" {...register("fullName")} />
			</div>
			<div>
				<h2>About me:</h2>
				<input type="text" {...register("aboutMe")} />
			</div>
			<div>
				<div>Contacts:{Object.keys(profile.contacts).map(item => {
					// @ts-ignore
					return <p key={item}>{item}: <input type="text" {...register(`contacts.${item}`)} /></p>//не работает//!
				})}</div>
				
			</div>
			<div>
				<h2>Looking for a job?</h2>
				<input type="checkbox" {...register("lookingForAJob")} />
				<label> yes</label>
			</div>
			<div>
				<h2>Looking for a job description</h2>
				<input type="text" {...register("lookingForAJobDescription")} />
			</div>
		</form>
	)
}

export default ProfileDataForm;