import React from "react";
import s from './Users.module.css'

const Users = (props) => {
	return <div>
		{
			props.users.map((u) => <div key={u.id}>
				<div className={s.user__wrapper}>
					<div className={s.user__leftBlock}>
						<div className={s.user__foto}>
							<img src={u.photoUrl} alt="photo_user" />
						</div>
						<div className={s.user__button}>
							{u.followed
							? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
							: <button onClick= {() => {props.follow(u.id)}}>Follow</button>}
						</div>
					</div>
					<div className={s.user__rightBlock}>
						<div className={s.user__name}>{u.fullName}</div>
						<div className={s.user__status}>
							{u.status}
						</div>
						<div className={s.user__location}>
							<div className={s.user__locationCity}>
								{u.location.city}
							</div>
							<div className={s.user__locationCountry}>
								{u.location.country}
							</div>
						</div>
					</div>
				</div>
			</div> ) 
		}
	</div>
}

export default Users;