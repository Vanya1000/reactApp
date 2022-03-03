import { Pagination } from "antd";
import React from "react";
import { FilterType } from "../../redux/usersReducer";
import { UsersType } from "../../types/types";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";

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
	onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = ({ totalUserCount, pageSize, currentPage, onPageChanged, setPageSize, onPageSizeChange, ...props }) => {
	function onChange(pageNumber: number) {
		onPageChanged(pageNumber)
	}
	return (
		<div>
			<UsersSearchForm onFilterChanged={props.onFilterChanged} />
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

export default Users;
