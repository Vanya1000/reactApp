import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ProfileDataForm = (props) => {
	const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
	const onSubmit = data => {
		props.saveProfile(data);
		props.goToExitEditMode();
	}
	setValue('fullName', props.profile.fullName)
	setValue('aboutMe', props.profile.aboutMe)
	setValue('lookingForAJob', props.profile.lookingForAJob)
	setValue('lookingForAJobDescription', props.profile.lookingForAJobDescription)
	Object.keys(props.profile.contacts).forEach((key) => { setValue(`contacts.${key}`, props.profile.contacts[key])})
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
				<div>Contacts:{Object.keys(props.profile.contacts).map(item => {
					return <p key={item}>{item}: <input type="text" {...register(`contacts.${item}`)} /></p>
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