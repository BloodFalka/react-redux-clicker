import styled from "styled-components"

type StyledButtonProps = {
	color?: string
	bgColor?: string
	disabled?: boolean
}

const Button =
	styled.button <
	StyledButtonProps >
	`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	margin-top: 10px;
	width: 48%;
	font-family: monospace;
	font-size: 17px;
	color: ${(props) => props.color || 'white'};
	padding: 15px;
	background-color: ${(props) => props.disabled? 'transparent': props.bgColor || '#7952b3'};
	border-radius: 6px;
	box-shadow:${(props) => props.disabled? 'inset 0px 0px 0px 1px #7952b3': 'none'};
	border: none;
`

export default Button