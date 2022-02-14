import React from "react";
import { Link, NavLink } from 'react-router-dom';
import FriendsBlock from './FriendsBlock/FriendsBlock';
import FriendsBlockContainer from './FriendsBlock/FriendsBlockContainer';
import s from './Navbar.module.css';
const setActive = ({isActive}: any) => isActive ? s.activeLink : '';

// todo типизация any

const Navbar: React.FC = (props) => {
	
	return (
		<nav className={s.nav}>
			<div className={s.item}>
				<NavLink to="/profile" className={setActive}>Profile</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to="/dialogs" className={setActive}>Messages</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to="/news" className={setActive}>News</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to="/music" className={setActive}>Music</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to="/notes" className={setActive}>Notes</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to="/users" className={setActive}>Users</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to="/settings" className={setActive}>Settings</NavLink>
			</div>
			<FriendsBlockContainer />
		</nav>
	)
}
export default Navbar;
