import { Link, NavLink } from 'react-router-dom';
import FriendsBlock from './FriendsBlock/FriendsBlock';
import s from './Navbar.module.css';
const setActive = ({isActive}) => isActive ? s.activeLink : '';

const Navbar = (props) => {
	
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
				<NavLink to="/settings" className={setActive}>Settings</NavLink>
			</div>
			<FriendsBlock friends={props.state.friends} />
		</nav>
	)
}
export default Navbar;
