import React from "react";
import s from './User.module.css'
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { UsersType } from "../../types/types";

type PropsType = {
	user: UsersType
	followingInProgress: boolean
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}

let User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow}) => {
	return  (
		<div>
			<div className={s.user__wrapper}>
				<div className={s.user__leftBlock}>
					<div className={s.user__foto}>
						<NavLink to={`profile/${user.id}`}>
							<img src={user.photos.small ? user.photos.small : userPhoto} alt="photo_user" />
						</NavLink>
					</div>
					<div className={s.user__button}>
						{user.followed
							? <button disabled={followingInProgress} onClick={() => {
								unfollow(user.id);
							}}>Unfollow</button>
							: <button disabled={followingInProgress} onClick={() => {
								follow(user.id);
							}}>Follow</button>}
					</div>
				</div>
				<div className={s.user__rightBlock}>
					<div className={s.user__name}>{user.name}</div>
					<div className={s.user__status}>
						{user.status}
					</div>
					<div className={s.user__location}>
						<div className={s.user__locationCity}>
							{'user.location.city'}
						</div>
						<div className={s.user__locationCountry}>
							{'user.location.country'}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default User;