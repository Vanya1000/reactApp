import { Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUserCount, getUsersFilter, getUsersSuper } from "../../redux/users-selectors";
import { FilterType, getUsersOnPageSize, getUsersThunkCreator } from "../../redux/usersReducer";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";

type PropsType = {
}

export const Users: React.FC<PropsType> = (props) => {

	const users = useSelector(getUsersSuper)
	const totalUserCount = useSelector(getTotalUserCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)//const pageSize = useSelector((state) => state.usersPage.pageSize)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)



	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
	}, [])

	const onPageSizeChange = (current: number, size: number) => {
		dispatch(getUsersOnPageSize(currentPage, size))
	}

	const onPageChanged = (pageNumber: number) => {
		dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
	}

	const onFilterChanged = (filter: FilterType) => {
		dispatch(getUsersThunkCreator(1, pageSize, filter))
	}

	const follow = (userId: number) => {
		dispatch(follow(userId))
	}

	const unfollow = (userId: number) => {
		dispatch(unfollow(userId))
	}



	function onChange(pageNumber: number) {
		onPageChanged(pageNumber)
	}
	return (
		<div>
			<UsersSearchForm onFilterChanged={onFilterChanged} />
			<Pagination showQuickJumper defaultCurrent={1} total={totalUserCount} defaultPageSize={pageSize} onChange={onChange} onShowSizeChange={onPageSizeChange}/>
			{
				users.map((u) => <User
					user={u}
					followingInProgress={followingInProgress}
					key={u.id}
					unfollow={unfollow}
					follow={follow}
				/>)
			}
		</div>
	)
}

