import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { FaUserAlt } from 'react-icons/fa'
import { getGameStats } from '../../redux/reducers/shop-reducer'
import { selectUserData } from '../../redux/selectors/auth-selector'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 4vh;
	background-color: white;
	color: black;
`

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0px 15px;
	width: 100%;
	/* @media (min-width: 768px) {
		width: 720px;
	}
	@media (min-width: 992px) {
		width: 960px;
	}
	@media (min-width: 1200px) {
		width: 1140px;
	} */
`
const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	line-height: 0;
	color: black;
	& + & {
		margin-left: 25px;
	}
	&.active {
		color: #7952b3;
		font-size: 20px;
	}
	@media (max-width: 576px) {
		font-size: 15px;
		& + & {
			margin-left: 10px;
		}
		&.active {
			color: #7952b3;
			font-size: 17px;
			font-weight: 600;
		}
	}
`

const AuthIndicator = styled.div`
	display: flex;
	align-items: center;
	color: #7952b3;
	font-size: 20px;
	svg {
		margin-right: 5px;
	}
	@media (max-width: 576px) {
		font-size: 15px;
	}
`

const Navbar = () => {
	const { username } = useSelector(selectUserData),
		isAuth = username ? true : false

	const dispatch = useDispatch()

	useEffect(() => {
		if (isAuth) {
			dispatch(getGameStats())
		}
		// eslint-disable-next-line
	}, [isAuth])

	return (
		<Wrapper>
			<Container>
				<div>
					<StyledNavLink to="/" exact>
						Game
					</StyledNavLink>
					<StyledNavLink to="/login">{isAuth ? 'Logout' : 'Login'}</StyledNavLink>
				</div>
				{isAuth ? (
					<AuthIndicator>
						<FaUserAlt />
						{username}
					</AuthIndicator>
				) : null}
			</Container>
		</Wrapper>
	)
}

export default Navbar
