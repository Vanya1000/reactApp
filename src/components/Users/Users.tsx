import { Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUserCount, getUsersFilter, getUsersSuper } from "../../redux/users-selectors";
import { FilterType, getUsersOnPageSize, getUsersThunkCreator } from "../../redux/usersReducer";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import * as queryString from 'querystring'


type PropsType = {
}
type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC<PropsType> = (props) => {

	const users = useSelector(getUsersSuper)
	const totalUserCount = useSelector(getTotalUserCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)//const pageSize = useSelector((state) => state.usersPage.pageSize)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)


	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		const {search} = history.location;
		const parsed = queryString.parse(search.substr(1)) as QueryParamsType

		let actualPage = currentPage
		let actualFilter = filter

		if (!!parsed.page) actualPage = Number(parsed.page)


		if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

		switch (parsed.friend) {
			case "null":
				actualFilter = { ...actualFilter, friend: null }
				break;
			case "true":
				actualFilter = { ...actualFilter, friend: true }
				break;
			case "false":
				actualFilter = { ...actualFilter, friend: false }
				break;
		}
		
		dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
	}, [])

	useEffect(() => {
		/* history.push({
			pathname: 'users',
			search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
		}) */
		const query: QueryParamsType = {}

		if (!!filter.term) query.term = filter.term
		if (filter.friend !== null) query.friend = String(filter.friend)
		if (currentPage !== 1) query.page = String(currentPage)

		history.push({
			pathname: '/users',
			search: queryString.stringify(query)
		})
	}, [filter, currentPage]) // как только объект filter будет другой

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

