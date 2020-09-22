import { AppStateType } from '../store'

export const selectIsLoading = (state: AppStateType) => state.shop.isLoading

export const selectGameStats = (state: AppStateType) => state.shop.gameStats

export const selectHeroes = (state: AppStateType) => state.shop.heroes
