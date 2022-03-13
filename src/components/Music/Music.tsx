import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import s from './Music.module.css';

const Music: React.FC = () => {
	return (
		<div>
			<Github />
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

type UserType = {
	login: string
	id: number
	avatar_url: string
	followers: number
}

const Github = () => {
	const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
	const initialSearchState = 'it'
	const [searchTerm, setSearchTerm] = useState(initialSearchState)

	useEffect(() => {
		if (selectedUser) {
			document.title = selectedUser.login
		}
	}, [selectedUser])

	return <div>
		<Row>
			<Col flex={1}>
				<div>
					<Search value={searchTerm} onSubmit={(value: string) => { setSearchTerm(value) }} />
					<button onClick={() => { setSearchTerm(initialSearchState) }}>reset</button>
					<UsersList searchTerm={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser} />
				</div>
			</Col>
			<Col flex={9}>
				<UserDetails selectedUser={selectedUser} />
			</Col>
		</Row>
	</div>
}

type SearchPropsType = {
	value: string
	onSubmit: (value: string) => void
}


const Search: React.FC<SearchPropsType> = ({ onSubmit, value }) => {
	const [tempSearch, setTempSearch] = useState(value)

	useEffect(() => {// для синхронизации. Когда в родительск компоненте происходит сброс, дочерняя синхронизируется.
		setTempSearch(value)
	}, [value])

	return <div>
		<input placeholder="search" value={tempSearch} onChange={(e) => { setTempSearch(e.currentTarget.value) }} />
		<button
			onClick={() => {
				onSubmit(tempSearch)
			}}
		>find</button>
	</div>
}

type UserListPropsType = {
	searchTerm: string
	selectedUser: SearchUserType | null
	onUserSelect: (user: SearchUserType) => void
}

const UsersList: React.FC<UserListPropsType> = ({ searchTerm, selectedUser, onUserSelect }) => {

	const [users, setUsers] = useState<SearchUserType[]>([])

	useEffect(() => {
		axios
			.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
			.then(res => {
				setUsers(res.data.items)
			})
	}, [searchTerm])

	return <div>
		<ul>
			{users.map(u => <li key={u.id} className={selectedUser === u ? s.selected : ''}
				onClick={() => {
					onUserSelect(u)
				}}>
				{u.login}
			</li>)}
		</ul>
	</div>
}


const START_TIMER_SECONDS = 10;


type TimerPropsType = {
	seconds: number
	onChange: (actualSeconds: number) => void
	timerKey: string
}

const Timer: React.FC<TimerPropsType> = ({ seconds, onChange, timerKey }) => {

	const [timer, setTimer] = useState(seconds)

	useEffect(() => {
		setTimer(seconds)
	}, [seconds])

	useEffect(() => {
		onChange(timer)
	}, [timer])

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimer((prev) => prev - 1)
		}, 1000)// через prev получаем актуальный state обходя проблему замыкания
		return () => { clearInterval(intervalId)}
	}, [timerKey])// делаем установку интервала


	return <div>
		{timer}
	</div>
}






type PropsType = {
	selectedUser: SearchUserType | null
}

const UserDetails: React.FC<PropsType> = ({ selectedUser }) => {
	const [userDetails, setUserDetails] = useState<UserType | null>(null)
	const [seconds, setSeconds] = useState(START_TIMER_SECONDS)



	useEffect(() => {
		if (!!selectedUser) {
			axios
				.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
				.then(res => {
					setSeconds(START_TIMER_SECONDS)
					setUserDetails(res.data)
				})
		}
	}, [selectedUser])

	useEffect(() => {
		if (seconds < 0) {
			setUserDetails(null)// но таймер не умер, так как это асинхрон живущий в браузере. И происходит утечка памяти.
		}
	}, [seconds])

	return <div>

		{userDetails && <div>
			<Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id.toString()}/>
			<img src={userDetails.avatar_url} alt="" />
			<br />
			<h2>Username</h2>
			{userDetails.login}, followers:{userDetails.followers}
		</div>}
	</div>
}
