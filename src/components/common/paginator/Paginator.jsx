import React from "react";
import s from './Paginator.module.css'


let Paginator = ({ totalUserCount, pageSize, currentPage, onPageChanged }) => {

	let pagesCount = Math.ceil(totalUserCount / pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return <div className={s.count__wrapper}>
		{pages.map((p) => {
			return <span className={currentPage === p ? s.bold : s.pageNumber} onClick={(e) => { onPageChanged(p) }}>{p}</span>
		})}
	</div>
}

export default Paginator;