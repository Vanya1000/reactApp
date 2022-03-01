import { Pagination } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { UsersType } from "../../types/types";
import User from "./User";

type PropsType = {
	totalUserCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	setPageSize?: number
	users: Array<UsersType>
	followingInProgress: boolean
	unfollow: (userId: number) => void
	follow: (userId: number) => void
	onPageSizeChange: (current: number, size: number) => void
}

let Users: React.FC<PropsType> = ({ totalUserCount, pageSize, currentPage, onPageChanged, setPageSize, onPageSizeChange, ...props }) => {
	function onChange(pageNumber: number) {
		onPageChanged(pageNumber)
	}
	return (
		<div>
			<UsersSearchForm />
			<Pagination showQuickJumper defaultCurrent={1} total={totalUserCount} defaultPageSize={pageSize} onChange={onChange} onShowSizeChange={onPageSizeChange}/>
			{
				props.users.map((u) => <User
					user={u}
					followingInProgress={props.followingInProgress}
					key={u.id}
					unfollow={props.unfollow}
					follow={props.follow}
				/>)
			}
		</div>
	)
}

type FormData = {
	term : string;
};

const UsersSearchForm = () => {
	const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
	const onSubmit = handleSubmit(data => console.log(data));

	return <div>
		<form onSubmit={onSubmit}>
			<input {...register("term", { required: 'Field is requared'})}  />
			<button
				type="button"
				onClick={() => {onSubmit()}}
			>
				Search
			</button>
		</form>
	</div>
}

export default Users;
