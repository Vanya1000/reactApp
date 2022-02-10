import { ProfileType, UsersType } from './../types/types';
import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
	withCredentials: true,
	baseURL:'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "70e8e5ed-ff03-4d7b-b77d-74a34aff6348"
	}
})

export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}

export enum ResultCodeForCaptchaEnum {
	CaptchaIsRequired = 10
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {//  он не точен, его нужно будет уточнить по умолчан d равен пустому типу
	data: D // generic тип D data
	messages: Array<string>
	resultCode: RC // какой то result code тип
	
}