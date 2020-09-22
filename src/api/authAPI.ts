import { APIResponseType, axiosInstance } from './api'

export type UserLoginData = {
	username: string,
	password: string,
}

type SignInResponseData = {
	userId: string | null,
	token: string | null,
	username: string | null,
}

type SignInResponseMessages =
	| 'Некорректные данные'
	| 'Пользователь не найден'
	| 'Неверный пароль'
	| 'Успешная авторизация'
	| 'Что-то пошло не так, попробуйте снова'

type SignUpResponseMessages =
	| 'Некорректные данные'
	| 'Имя уже используеться'
	| 'Пользователь создан'
	| 'Что-то пошло не так, попробуйте снова'

export const authAPI = {
	signup(userLoginData: UserLoginData) {
		return axiosInstance
			.post<APIResponseType<{}, SignUpResponseMessages>>(`auth/signup`, {
				username: userLoginData.username,
				password: userLoginData.password,
			})
			.then((response) => response.data)
	},
	signin(userLoginData: UserLoginData) {
		return axiosInstance
			.post<APIResponseType<SignInResponseData, SignInResponseMessages>>(`auth/signin`, {
				username: userLoginData.username,
				password: userLoginData.password,
			})
			.then((response) => response.data)
	},
}
