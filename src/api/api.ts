import { ProfileType } from './../types/types';
import axios, { AxiosResponse } from 'axios';


const instance = axios.create({
	withCredentials: true,
	baseURL:'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "70e8e5ed-ff03-4d7b-b77d-74a34aff6348"
	}
})

export  const usersAPI = {//вспомагательный объект который содержит методы(набор)
	getUsers(currentPage: number, pageSize: number)  {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	},
	setFollow(id: number) {
		return instance.post(`follow/${id}`)
	},
	setUnfollow(id: number) {
		return instance.delete(`follow/${id}`)
	},
	
}

export const profileAPI = {
	getUserProfile(userId: number | null) {
		return instance.get(`profile/${userId}`)
	},
	getStatus(id: number) {
		return instance.get(`profile/status/${id}`)
	},
	updateStatus(newStatusText: string) {
		return instance.put(`profile/status`, { status: newStatusText })
	},
	savePhoto(photoFile: any) {
		const formData = new FormData();
		formData.append('image', photoFile)
		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	saveProfile(profile: ProfileType) {
		return instance.put(`profile`, profile);
	}
}

export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}

type checksLoginResponseTypes = {
	data: {
		id: number
		email: string
		login: string
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

type loginResponseTypes = {
	resultCode: ResultCodesEnum | ResultCodeForCaptcha
	messages: Array<string>
	data: {
		userId: number
	}
}

export const authAPI = {
	checksLogin() {
		return instance.get<checksLoginResponseTypes>('auth/me').then(res => res.data)// возвращает промис и мы его ретурним // когда мы делаем запрос мы ожидаем получить тип
	},
	login(email:string, password:string, rememberMe: boolean = false, captcha: null | string = null) {
		return instance.post<loginResponseTypes>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data)
	},
	logout() {
		return instance.delete('auth/login')
	}
}

export const securityAPI = {
	getCaptcha() {
		return instance.get('security/get-captcha-url')
	}
}



authAPI.logout().then((res: AxiosResponse<number>) => res.data )

