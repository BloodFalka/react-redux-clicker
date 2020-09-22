import { createStore, combineReducers, applyMiddleware, compose, Action } from 'redux'
import authReducer from './reducers/auth-reducer'
import thunkMiddleware, { ThunkAction } from  'redux-thunk'
import shopReducer from './reducers/shop-reducer'
import enemyReducer from './reducers/enemy-reducer'

let rootReducer = combineReducers({
	auth: authReducer,
	shop: shopReducer,
	enemy: enemyReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export type BaseThunkType<A extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
