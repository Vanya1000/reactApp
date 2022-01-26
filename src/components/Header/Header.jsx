import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css';
import { Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';


const Header = (props) => {
	return (
		<header className={s.header}>
			<div>
				<img src="https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip" alt="" />
			</div>
			<div className={s.login__block}>
				{props.isAuth 
					? <div>
						<span>
							{`${props.login} `}
						</span>
						<span>
							<Button
								type="primary"
								icon={<PoweroffOutlined />}
								onClick={() => {props.logout()}}
							/>
						</span>
					</div>
					
				: <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>
	)
}

export default Header;