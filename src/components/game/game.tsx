import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectEnemy } from '../../redux/selectors/enemy-selector'
import { selectGameStats } from '../../redux/selectors/shop-selector'
import Enemy from './enemy/enemy'
import HeroShop from './shop/shop'

const GameWrapper = styled.div`
	display: grid;
	grid-template-columns: 285px 10fr;
	height: 96vh;
	@media (max-width: 992px) {
		/* grid-template-columns: 10fr;
		grid-template-rows: 10fr 3fr; */
	}
`

const Game = () => {
	const gameStats = useSelector(selectGameStats)
	const enemy = useSelector(selectEnemy)
	return (
		<GameWrapper>
			<HeroShop />
			<Enemy enemy={enemy} gameStats={gameStats} />
		</GameWrapper>
	)
}

export default Game
