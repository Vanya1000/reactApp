import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';
import { Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/auth-selectors";
import { logout } from "../../redux/auth-reducer";

export type MapPropsType = {
}
 
export const HeaderLogin: React.FC<MapPropsType> = (props) => {

	const isAuth = useSelector(selectIsAuth)
	const login = useSelector(selectCurrentUserLogin)

	const dispatch = useDispatch()

	const logoutCallback = () => {
		dispatch(logout())
	}

	return (
		<header className={s.header}>
			<div className={s.login__block}>
				{isAuth 
					? <div>
						<span>
							{`${login} `}
						</span>
						<span>
							<Button
								type="primary"
								icon={<PoweroffOutlined />}
								onClick={() => { logoutCallback()}}
							/>
						</span>
					</div>
					
				: <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>
	)
}
