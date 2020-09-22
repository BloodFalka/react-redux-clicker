import { authAPI, UserLoginData } from "../../api/authAPI";
import { InferActionsTypes, BaseThunkType } from '../store';

type initialStateType = typeof initialState

export type userDataTypes = {
	userId: null|string
	username: null|string
}

let initialState = {
	userData: { userId: null as string|null, username: null as string|null },
	serverMessage: {message:'', isError: false},
	isLoading: false,
};

const authReducer = (state = initialState, action:AuthActionsTypes): initialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
			return {
				...state,
				userData: { ...action.data },
			};
		case 'auth/SET_SERVER_MESSAGE':
			return {
				...state,
				serverMessage: action.serverMessage,
			};
		case 'auth/TOGGLE_LOADING':
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
	setAuthUserData: (userId: string|null, username: string|null) => ({
		type: 'auth/SET_USER_DATA',
		data: { userId, username },
	}as const),
	setServerMessage: ( message:string, isError: boolean) => ({
		type: 'auth/SET_SERVER_MESSAGE',
		serverMessage: {message, isError}
	}as const),
	toggleLoading: (isLoading: boolean) => ({
		type: 'auth/TOGGLE_LOADING',
		isLoading,
	}as const),
}

//THUNKS
type ThunkType<R={}> = BaseThunkType<AuthActionsTypes, R>

export const authRegister = (userLoginData:UserLoginData):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));

		try {
			const data = await authAPI.signup(userLoginData)
			let isError: boolean = true
			switch (data.message) {
				case 'Имя уже используеться':
					isError=true
					break;
				case 'Некорректные данные':
					isError=true
					break
				case 'Пользователь создан':
					isError=false
					dispatch(authLogin(userLoginData))
					break;
				case 'Что-то пошло не так, попробуйте снова':
					isError=true
					break;
				default:
					break;
			}
			dispatch(actions.setServerMessage(data.message, isError))
			dispatch(actions.toggleLoading(false));
		} catch (e) {
			debugger
			dispatch(actions.toggleLoading(false));
		}

	};
};


export const authLogin = (userLoginData:UserLoginData):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));
		try {
			const data = await authAPI.signin(userLoginData);
			let isError: boolean = true
			switch (data.message) {
				case 'Пользователь не найден':
					isError=true
					break;
				case 'Неверный пароль':
					isError=true
					break
				case 'Успешная авторизация':
					isError=false
					const {userId, username, token} = data.data
					dispatch(actions.setAuthUserData(userId, username))
					localStorage.setItem('userData', JSON.stringify({userId, username, token}))
					break;
				case 'Что-то пошло не так, попробуйте снова':
					isError=true
					break;
				default:
					break;
			}
			dispatch(actions.setServerMessage(data.message, isError))
		} catch(e){
			dispatch(actions.toggleLoading(false));
		}
		dispatch(actions.toggleLoading(false));
	}
};

export const authLogout = ():ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleLoading(true));

		dispatch(actions.setAuthUserData(null, null))
		dispatch(actions.setServerMessage('', false))
		localStorage.removeItem('userData')

		dispatch(actions.toggleLoading(false));
	};
};

export default authReducer;
