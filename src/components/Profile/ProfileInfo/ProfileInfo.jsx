import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import * as axios from 'axios';
import ProfileStatusWithHoocs from './ProfileStatusWithHoocs';
import userPhoto from '../../../assets/images/user.png';

const ProfileInfo = (props) => {
	if (!props.profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0]);
		}
	}
/* 	let savePhoto = (photoFile) => {
		const formData = new FormData();
		formData.append('image', photoFile)
		axios.put(`profile/photo`, formData, {
			withCredentials: true,
			baseURL: 'https://social-network.samuraijs.com/api/1.0/',
			headers: {
				"API-KEY": "70e8e5ed-ff03-4d7b-b77d-74a34aff6348"
			},
			'Content-Type': 'multipart/form-data'
		})
	}  */
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
				</div>
			</div>
		</div>
	)
}
export default ProfileInfo;

/* let savePhoto = (photoFile) => {
	const formData = new FormData();
	formData.append('image', photoFile)
	axios.put(`profile/photo`, formData, {
		withCredentials: true,
		baseURL: 'https://social-network.samuraijs.com/api/1.0/',
		headers: {
			"API-KEY": "70e8e5ed-ff03-4d7b-b77d-74a34aff6348"
		},
		'Content-Type': 'multipart/form-data'
	})
}  */