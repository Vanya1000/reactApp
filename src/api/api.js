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
		return instance.post(`follow/${id}`)
	},
	setUnfollow(id) {
		return instance.delete(`follow/${id}`)
	},
	
}

export const profileAPI = {
	getUserProfile(userId) {
		return instance.get(`profile/${userId}`)
	},
	getStatus(id) {
		return instance.get(`profile/status/${id}`)
	},
	updateStatus(newStatusText) {
		return instance.put(`profile/status`, { status: newStatusText })
	},
	savePhoto(photoFile) {
		const formData = new FormData();
		formData.append('image', photoFile)
		return instance.put(`profile/photo`, formData, {
			'Content-Type': 'multipart/form-data'
		})
	},
	saveProfile(profile) {
		return instance.put(`profile`, profile);
	}
}


export const authAPI = {
	checksLogin() {
		return instance.get('auth/me')
	},
	login(email, password, rememberMe = false) {
		return instance.post('auth/login', { email, password, rememberMe})
	},
	logout() {
		return instance.delete('auth/login')
	}
}






