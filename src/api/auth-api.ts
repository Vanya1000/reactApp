import { ResultCodesEnum, ResultCodeForCaptchaEnum, instance, ResponseType } from './api';
type checksLoginResponseDataTypes = {
	id: number
	email: string
	login: string
}

type loginResponseTypes = {
	userId: number
}

export const authAPI = {
	checksLogin() {
		return instance.get<ResponseType<checksLoginResponseDataTypes>>('auth/me').then(res => res.data)// возвращает промис и мы его ретурним // когда мы делаем запрос мы ожидаем получить тип
	},
	login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
		return instance.post<ResponseType<loginResponseTypes, ResultCodesEnum | ResultCodeForCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data)
	},
	logout() {
		return instance.delete('auth/login')
	}
}