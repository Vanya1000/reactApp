import { instance } from './api';
type getCaptchaTypes = {
	url: string
}

export const securityAPI = {
	getCaptcha() {
		return instance.get<getCaptchaTypes>('security/get-captcha-url').then(res => res.data)
	}
}