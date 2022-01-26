import * as axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL:'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "70e8e5ed-ff03-4d7b-b77d-74a34aff6348"
	}
})

export  const usersAPI = {//вспомагательный объект который содержит методы(набор)
	getUsers (currentPage, pageSize)  {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	},
	setFollow(id) {
		return instance.delete(`follow/${id}`)
	},
	setUnfollow(id) {
		return instance.post(`follow/${id}`)
	},
	
}

export const profileAPI = {
	getUserProfile(userId) {
		return instance.get(`profile/${userId}`)
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	},
	getStatus(id) {
		return instance.get(`profile/status/${id}`)
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	},
	updateStatus(newStatusText) {
		return instance.put(`profile/status`, { status: newStatusText })
		.then(response => {
			return response.data;//возвращаем только data(инкапсулируем)
		})
	},
}


export const authAPI = {
	checksLogin() {
		return instance.get('auth/me')
			.then(response => {
				return response.data;
			})
	},
	login(email, password, rememberMe = false) {
		return instance.post('auth/login', { email, password, rememberMe})
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	},
	logout() {
		return instance.delete('auth/login')
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	}
}






