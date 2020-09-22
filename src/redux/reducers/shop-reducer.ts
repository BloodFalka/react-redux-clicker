import { gameStatsAPI, GameStatsType } from '../../api/gameStatsAPI';
import { InferActionsTypes, BaseThunkType } from '../store';

import ladyMarinaImg from '../../assets/img/heroes/ladyMarina.png'
import stupidJuliaImg from '../../assets/img/heroes/stupidJulia.png'
import triangleGirlImg from '../../assets/img/heroes/girlTriangle.png'
import rabbitNazarImg from '../../assets/img/heroes/rabbitNazar.png'
import flowerGirlImg from '../../assets/img/heroes/flowerGirl.png'

type initialStateType = typeof initialState

let initialState = {
	gameStats: {
		lvl: {
			currentLvl: 1,
			currentStage: 1,
			enemiesOnLvl: 10
		},
		gold: {
			currentGold: 0,
			goldMultipler: 15
		},
		damage: {
			dpc: 1,
			dps: 0,
			critical: {
				chance: 0.2,
				multipler: 2
			},
		},
		enemy: {
			maxHp: 10
		},
	},
	heroes: [
		{
			name: 'Lady Marina',
			lvl: 0,
			cost: 5,
			baseDps: 1,
			img: ladyMarinaImg
		},
		{
			name: 'Stupid Julia',
			lvl: 0,
			cost: 50,
			baseDps: 5,
			img: stupidJuliaImg
		},
		{
			name: 'Triangle Girl',
			lvl: 0,
			cost: 500,
			baseDps: 20,
			img: triangleGirlImg
		},
		{
			name: 'Rabbit Nazar',
			lvl: 0,
			cost: 2000,
			baseDps: 200,
			img: rabbitNazarImg
		},
		{
			name: 'Flower Girl',
			lvl: 0,
			cost: 10000,
			baseDps: 1000,
			img: flowerGirlImg
		},
	],
	isLoading: false,
};

const shopReducer = (state = initialState, action:AuthActionsTypes): initialStateType => {
	switch (action.type) {
		case 'shop/SET_GAME_STATS':
			return{
				...state,
				gameStats: {...action.gameStats}
			}
		case 'shop/INCREASE_GOLD':
			return{
				...state,
				gameStats: {
					...state.gameStats,
					gold:{
						...state.gameStats.gold,
						currentGold: state.gameStats.gold.currentGold + action.gold
					}
				}

			}
		case 'shop/TOGGLE_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
};

//ACTIONS
type AuthActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
	setGameStats: (gameStats: GameStatsType) => ({
		type: 'shop/SET_GAME_STATS',
		gameStats,
	}as const),
	increaseGold: (gold: number) => ({
		type: 'shop/INCREASE_GOLD',
		gold,
	}as const),
	decreaseGold: (gold: number) => ({
		type: 'shop/DECREASE_GOLD',
		gold,
	}as const),
	toggleLoading: (isLoading: boolean) => ({
		type: 'shop/TOGGLE_LOADING',
		isLoading,
	}as const),
}

//THUNKS
type ThunkType<R={}> = BaseThunkType<AuthActionsTypes, R>

export const getGameStats = ():ThunkType => {
	return async (dispatch, getStore) => {
		const userId = getStore().auth.userData.userId
		dispatch(actions.toggleLoading(true));
debugger
		if(userId){
			try {
				const data = await gameStatsAPI.getGameStats(userId)

				switch (data.message) {
					case 'Данные успешно получены':
						debugger
						dispatch(actions.setGameStats(data.data))
						break;
					case 'Пользователь не найден':
						break;
					case 'Что-то пошло не так, попробуйте снова':

						break;
					default:
						break;
				}
				dispatch(actions.toggleLoading(false));
			} catch (e) {
				debugger
				dispatch(actions.toggleLoading(false));
			}
		}

	};
};

export default shopReducer;
