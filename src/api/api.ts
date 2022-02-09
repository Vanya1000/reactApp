import { ProfileType, UsersType } from './../types/types';
import axios, { AxiosResponse } from 'axios';


const instance = axios.create({
	withCredentials: true,
	baseURL:'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "70e8e5ed-ff03-4d7b-b77d-74a34aff6348"
	}
})

type GetItemsType = {
	items: Array<UsersType>
	totalCount: number
	error: string | null
}

type setFollowTypes = {
	data: {}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

type setUnfollowTypes = {
	data: {}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

export  const usersAPI = {//вспомагательный объект который содержит методы(набор)
	getUsers(currentPage: number, pageSize: number)  {
		return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data;//возвращаем только data(инкапсулируем)
			})
	},
	setFollow(id: number) {
		return instance.post<setFollowTypes>(`follow/${id}`)
	},
	setUnfollow(id: number) {
		return instance.delete<setUnfollowTypes>(`follow/${id}`)
	},
}

type getUserProfileTypes = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: {
		github: string
		vk: string
		facebook: string
		instagram: string
		twitter: string
		website: string
		youtube: string
		mainLink: string
	}
	photos: {
		small: string
		large: string
	}
}

type updateStatusTypes = {
	data: {
		
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

type SaveProfileTypes = {
	data: {

	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

type SavePhotoTypes = {
	data: {
		photos: {
			small: string
			large: string
		}
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

export const profileAPI = {
	getUserProfile(userId: number | null) {
		return instance.get<getUserProfileTypes>(`profile/${userId}`).then(res => res.data)
	},
	getStatus(id: number) {
		return instance.get<string>(`profile/status/${id}`).then(res => res.data)
	},
	updateStatus(newStatusText: string) {
		return instance.put<updateStatusTypes>(`profile/status`, { status: newStatusText }).then(res => res.data)
	},
	savePhoto(photoFile: any) {
		const formData = new FormData();
		formData.append('image', photoFile)
		return instance.put<SavePhotoTypes>(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => res.data)
	},
	saveProfile(profile: ProfileType) {
		return instance.put<SaveProfileTypes>(`profile`, profile).then(res => res.data)
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


type getCaptchaTypes = {
	url: string
}

export const securityAPI = {
	getCaptcha() {
		return instance.get<getCaptchaTypes>('security/get-captcha-url').then(res => res.data)
	}
}



//authAPI.logout().then((res: AxiosResponse<number>) => res.data )

