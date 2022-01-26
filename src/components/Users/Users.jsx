import React from "react";
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png';
import { Link, NavLink } from 'react-router-dom';
import * as axios from 'axios';
import { usersAPI } from "../../api/api";

let Users = (props) => {

	let pagesCount = Math.ceil(props.totalUserCount / props.pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return <div>
		<div className={s.count__wrapper}>
			{pages.map((p) => {
				return <span className={props.currentPage === p ? s.bold : s.pageNumber} onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
			})}
		</div>
		{
			props.users.map((u) => <div key={u.id}>
				<div className={s.user__wrapper}>
					<div className={s.user__leftBlock}>
						<div className={s.user__foto}>
							<NavLink to={`profile/${u.id}`}>
								<img src={u.photos.small ? u.photos.small : userPhoto} alt="photo_user" />
							</NavLink>
						</div>
						<div className={s.user__button}>
							{u.followed
								? <button disabled={props.followingInProgress} onClick={() => {
									props.follow(u.id);
								}}>Unfollow</button>
								: <button disabled={props.followingInProgress} onClick={() => {
									props.unfollow(u.id);
								}}>Follow</button>}
						</div>
					</div>
					<div className={s.user__rightBlock}>
						<div className={s.user__name}>{u.name}</div>
						<div className={s.user__status}>
							{u.status}
						</div>
						<div className={s.user__location}>
							<div className={s.user__locationCity}>
								{'u.location.city'}
							</div>
							<div className={s.user__locationCountry}>
								{'u.location.country'}
							</div>
						</div>
					</div>
				</div>
			</div>)
		}
	</div>
}
export default Users;