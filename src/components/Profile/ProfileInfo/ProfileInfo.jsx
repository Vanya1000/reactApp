import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
	if (!props.profile) {
		return <Preloader />
	}
	return (
		<div>
			{/* <div className={s.image}>
				<img src="https://static.dw.com/image/18813153_303.jpg" alt="" />
			</div> */}
			<div className={s.discriptionBlock}>
				<div>
					<img src={props.profile.photos.large} alt="avatar" />
				</div>
				<ProfileStatus />
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