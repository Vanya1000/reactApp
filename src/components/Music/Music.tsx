import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import s from './Music.module.css';

const Music: React.FC = () => {
	return (
		<div>
			<Github/>
		</div>
	)
}
export default Music;


type SearchUserType = {
	login: string
	id: number
}

type SearchResult = {
	items: SearchUserType[]
}


const Github = () => {
	const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
	const [users, setUsers] = useState<SearchUserType[]>([])

	useEffect(() => {
		if (selectedUser) {
			document.title = selectedUser.login
		}
	}, [selectedUser])

	useEffect(() => {
		axios
		.get<SearchResult>('https://api.github.com/search/users?q=Vanya')
		.then(res => {
			setUsers(res.data.items)
		})
	}, [])

	return <div>
		<Row>
			<Col flex={1}>
				<div>
					<div>
						<input placeholder="search" /> <button>find</button>
					</div>
					<ul>
						{users.map(u => <li key={u.id} className={selectedUser === u ? s.selected : ''} 
						onClick={() => {
							setSelectedUser(u)
							}}>
							{u.login}
							</li>)}
					</ul>
				</div>
			</Col>
			<Col flex={9}>
				<div>
					<h2>Username</h2>
					<div>Details</div>
				</div>
			</Col>
		</Row>
		
		
	</div>
}