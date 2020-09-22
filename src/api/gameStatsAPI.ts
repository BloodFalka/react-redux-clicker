import { APIResponseType, axiosInstance } from './api'

export type GameStatsType = {
	lvl: {
		currentLvl: number,
		currentStage: number,
		enemiesOnLvl: number,
	},
	gold: {
		currentGold: number,
		goldMultipler: number,
	},
	damage: {
		dpc: number,
		dps: number,
		critical: {
			chance: number,
			multipler: number,
		},
	},
	enemy: {
		maxHp: number,
	},
}

type GetGameStatsResponseMessages =
	| 'Пользователь не найден'
	| 'Данные успешно получены'
	| 'Что-то пошло не так, попробуйте снова'

export const gameStatsAPI = {
	getGameStats(userId: string) {
		return axiosInstance
			.get<APIResponseType<GameStatsType, GetGameStatsResponseMessages>>(`stats/${userId}`)
			.then((response) => response.data)
	},
	// setGameStats(userLoginData: UserLoginData) {
	// 	return axiosInstance
	// 		.post<APIResponseType<SignInResponseData, SignInResponseMessages>>(`auth/signin`, {
	// 			username: userLoginData.username,
	// 			password: userLoginData.password,
	// 		})
	// 		.then((response) => response.data)
	// },
}
