import { UsersType } from './../types/types';
import { instance, ResponseType } from './api';

type GetItemsType = {
	items: Array<UsersType>
	totalCount: number
	error: string | null
}



export const usersAPI = {//вспомагательный объект который содержит методы(набор)
	getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
		return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	},
	setFollow(id: number) {
		return instance.post<ResponseType>(`follow/${id}`).then(res => res.data)
	},
	setUnfollow(id: number) {
		return instance.delete<ResponseType>(`follow/${id}`).then(res => res.data)
	},
}