import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { userDataTypes, actions } from '../../redux/reducers/auth-reducer'
import Game from '../game/game'
import Login from '../login/login'

const MainContent = () => {
    const dispatch = useDispatch()

    useEffect(() => {
		if (localStorage.getItem('userData')) {
			const userData: userDataTypes = JSON.parse(localStorage.getItem('userData') as string)
			dispatch(actions.setAuthUserData(userData.userId, userData.username))
		}
		// eslint-disable-next-line
    }, [])

	return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Game} />
        </Switch>
	)
}

export default MainContent
