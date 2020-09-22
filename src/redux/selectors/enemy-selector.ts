import { AppStateType } from '../store'

export const selectIsLoading = (state: AppStateType) => state.enemy.isLoading

export const selectEnemy = (state: AppStateType) => state.enemy.enemy
