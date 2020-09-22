import { AppStateType } from '../store'

export const selectIsLoading = (state: AppStateType) => state.auth.isLoading

export const selectUserData = (state: AppStateType) => state.auth.userData

export const selectServerMessage = (state: AppStateType) => state.auth.serverMessage
