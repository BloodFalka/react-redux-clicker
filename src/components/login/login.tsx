import { Formik, Form, Field, ErrorMessage } from 'formik'
import { authLogin, authLogout, authRegister } from '../../redux/reducers/auth-reducer'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/enemies/ladyMarinaEnemy.png'
import Button from '../common/button/button'
import { UserLoginData } from '../../api/authAPI'
import { selectIsLoading, selectServerMessage, selectUserData } from '../../redux/selectors/auth-selector'
import Spinner from '../common/spinner/spinner'

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.label('Username')
		.required()
		.trim()
		.min(3, 'Min Length is 3 symbols')
		.max(30, 'Max Length is 30 symbols'),
	password: yup
		.string()
		.label('Password')
		.required()
		.trim()
		.min(6, 'Min Length is 6 symbols')
		.max(15, 'Max Length is 15 symbols'),
})

const Wrapper = styled.div`
	color: white;
	height: 96vh;
	background-color: black;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`

const StyledField = styled(Field)`
	box-sizing: border-box;
	margin-top: 10px;
	font-family: monospace;
	background-color: white;
	height: 40px;
	padding: 10px;
	transition: background-color 0.25s ease;
	width: 100%;
	border: 1px solid white;
	border-radius: 3px;
	color: black;
	overflow: hidden;
	&:active,
	&:hover,
	&:focus {
		color: white;
		background-color: transparent;
	}
`

const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`

const StyledForm = styled(Form)`
	width: 230px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const StyledError = styled(ErrorMessage)`
	color: red;
	margin-top: 5px;
	text-align: center;
`
type StyledResponseErrorProps = {
	isError?: boolean,
}

const StyledResponseError =
	styled.div <
	StyledResponseErrorProps >
	`
	font-family: monospace;
	font-size: 17px;
	box-sizing: border-box;
	text-align: center;
	margin-top: 10px;
	width: 100%;
	background-color: ${(props) => (props.isError ? 'red' : '#5ab352')};
	border-radius: 4px;
	padding: 10px;
	color: white;
	text-shadow: 2px 2px 3px black;
`

const Login = () => {
	const [submitAction, setSubmitAction] = useState<'login' | 'register'>('login')

	const handlerSubmit = (values: UserLoginData) => {
		if (submitAction === 'register') {
			dispatch(authRegister(values))
		} else {
			dispatch(authLogin(values))
		}
	}

	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading),
		isAuth = useSelector(selectUserData).username ? true : false,
		serverMessage = useSelector(selectServerMessage)

	return (
		<Wrapper>
			<Logo />
			{isAuth ? (
				<Button style={{ width: '230px' }} bgColor="red" onClick={() => dispatch(authLogout())}>
					Logout
				</Button>
			) : (
				<Formik
					initialValues={{ username: '', password: '' }}
					onSubmit={(values, { resetForm, setFieldError }) => {
						handlerSubmit(values)
						setFieldError('general', 'wrwe2e')
						resetForm()
					}}
					validationSchema={validationSchema}
				>
					{({ isSubmitting, submitForm }) => (
						<StyledForm>
							{isLoading ? (
								<Spinner />
							) : (
								<>
									<StyledField type="username" name="username" placeholder="username" />
									<StyledError name="username" component="div" />
									<StyledField type="password" name="password" placeholder="password" />
									<StyledError name="password" component="div" />

									{serverMessage.message ? (
										<StyledResponseError isError={serverMessage.isError}>
											{serverMessage.message}
										</StyledResponseError>
									) : null}
								</>
							)}

							<ButtonsWrapper>
								<Button
									type="button"
									onClick={() => {
										setSubmitAction('register')
										submitForm()
									}}
									disabled={isLoading}
								>
									Register
								</Button>
								<Button
									type="button"
									onClick={() => {
										setSubmitAction('login')
										submitForm()
									}}
									disabled={isLoading}
								>
									Login
								</Button>
							</ButtonsWrapper>
						</StyledForm>
					)}
				</Formik>
			)}
		</Wrapper>
	)
}

const StyledLogo = styled.img`
	width: 250px;
`

const Logo = () => {
	return <StyledLogo src={logo} alt="Logo" />
}

export default Login
