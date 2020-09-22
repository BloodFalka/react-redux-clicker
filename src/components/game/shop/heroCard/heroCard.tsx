import React from 'react'
import styled from 'styled-components'

import Button from '../../../common/button/button'
import bells from '../../../../assets/img/valutes/bells.png'

const CardWrapper = styled.div`
	display: flex;
	padding: 10px 0px;
	flex-direction: column;
	align-items: center;
	background-color: rgb(51, 51, 51);
	width: 250px;
	& + & {
		margin-top: 15px;
	}
	border-radius: 8px;
	justify-content: center;
`

const CardImg = styled.img`
	max-height: 210px;
    max-width: 230px;
`

const CardTitle = styled.div`
	color: white;
`
const Bells = styled.img`
	margin-left: 5px;
	height: 20px;
`

const StyledHr = styled.hr`
	background-color: white;
	width: 80%;
`


type Props = {
	gold: number|null
	name: string
	cost: number
	img: string
}

const HeroCard: React.FC<Props> = ({gold, name, cost, img}) => {
	const canBuy = gold && gold >= cost? true:false
	return (
		<CardWrapper>
			<CardTitle>{name}</CardTitle>
			<CardImg src={img} alt="enemy" />
			<StyledHr/>
			<Button disabled={!canBuy} style={{ padding: '10px', width: '80%' }}>Buy {cost} <Bells src={bells}/></Button>
		</CardWrapper>
	)
}

export default HeroCard
