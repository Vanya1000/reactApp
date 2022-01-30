import { Pagination } from "antd";
import React from "react";
import Paginator from "../common/paginator/Paginator";
import User from "./User";


let Users = ({ totalUserCount, pageSize, currentPage, onPageChanged, setPageSize, ...props }) => {
	function onChange(pageNumber) {
		onPageChanged(pageNumber)
	}
	return (
		<div>
			{/* <Paginator totalUserCount={totalUserCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} /> */}
			<Pagination showQuickJumper defaultCurrent={1} total={totalUserCount} defaultPageSize={pageSize} onChange={onChange} onShowSizeChange={props.onPageSizeChange}/>
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
