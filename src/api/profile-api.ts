import { ProfileType, PhotosType } from './../types/types';
import { ResultCodesEnum, instance, ResponseType } from './api';



type SavePhototype = {
	photo: PhotosType
}



export const profileAPI = {
	getUserProfile(userId: number | null) {
		return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
	},
	getStatus(id: number) {
		return instance.get<string>(`profile/status/${id}`).then(res => res.data)
	},
	updateStatus(newStatusText: string) {
		return instance.put<ResponseType>(`profile/status`, { status: newStatusText }).then(res => res.data)
	},
	savePhoto(photoFile: any) {
		const formData = new FormData();
		formData.append('image', photoFile)
		return instance.put<ResponseType<SavePhototype>>(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => res.data)
	},
	saveProfile(profile: ProfileType) {
		return instance.put<ResponseType>(`profile`, profile).then(res => res.data)
	}
}