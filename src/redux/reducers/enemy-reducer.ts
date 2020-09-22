import { InferActionsTypes, BaseThunkType } from '../store';

import ladyMarinaEnemyImg from '../../assets/img/enemies/ladyMarinaEnemy.png'
import rabbitNazarEnemy from '../../assets/img/enemies/rabbitNazarEnemy.png'
import rabbitNazarEnemyGuilded from '../../assets/img/enemies/rabbitNazarEnemy-guilded.png'

const enemies = [
	{
		name: 'Lady Marina',
		img: ladyMarinaEnemyImg
	},
	{
		name: 'Rabbit Nazar',
		img: rabbitNazarEnemy
	},
	{
		name: 'Rabbit Nazar+',
		img: rabbitNazarEnemyGuilded
	}
]

type initialStateType = typeof initialState

export type EnemyType = typeof initialState.enemy

let initialState = {
	enemy: {
		img: enemies[0].img,
		name: enemies[0].name,
		maxHp: 10,
		currentHp: 10,
	},

	isLoading: false,
};

const enemyReducer = (state = initialState, action:AuthActionsTypes): initialStateType => {
	switch (action.type) {
		case 'enemy/CHANGE_ENEMY':
			return {
				...state,
				enemy: {
					...state.enemy,
					img: enemies[action.enemy].img,
					name: enemies[action.enemy].name,
					currentHp: state.enemy.maxHp
				},
			};
		case "enemy/DECREASE_CURRENT_HP":
			return{
				...state,
				enemy: {
					...state.enemy,
					currentHp: state.enemy.currentHp - action.hp
				}
			}
		case 'enemy/TOGGLE_LOADING':
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
	changeEnemy: () => ({
		type: 'enemy/CHANGE_ENEMY',
		enemy: Math.ceil(Math.random()*enemies.length-1),
	}as const),
	decreaseCurrentHp: (hp: number) => ({
		type: 'enemy/DECREASE_CURRENT_HP',
		hp,
	}as const),
	increaseCurrentHp: (hp: number) => ({
		type: 'enemy/INCREASE_CURRENT_HP',
		hp,
	}as const),
	decreaseMaxHp: (hp: number) => ({
		type: 'enemy/DECREASE_MAX_HP',
		hp,
	}as const),
	increaseMaxHp: (hp: number) => ({
		type: 'enemy/INCREASE_MAX_HP',
		hp,
	}as const),
	toggleLoading: (isLoading: boolean) => ({
		type: 'enemy/TOGGLE_LOADING',
		isLoading,
	}as const),
}

//THUNKS
type ThunkType<R={}> = BaseThunkType<AuthActionsTypes, R>

export const getGameStats = ():ThunkType => {
	return async (dispatch, getStore) => {
		dispatch(actions.toggleLoading(true));

		dispatch(actions.toggleLoading(false));
	};
};

export default enemyReducer;
