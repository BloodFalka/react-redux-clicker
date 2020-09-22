import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectGameStats, selectHeroes } from '../../../redux/selectors/shop-selector'
import HeroCard from './heroCard/heroCard'

const ShopWrapper = styled.div`
	display: flex;
	background-color: black;
	border-bottom-right-radius: 10px;
	flex-direction: column;
	padding: 15px;
	max-height: 100%;
	overflow: scroll;
	overflow-x: hidden;
`

const HeroShop = () => {
	const heroes = useSelector(selectHeroes)
	const gameStats = useSelector(selectGameStats)

	const heroesTemplate = heroes.map((item, i) => {
		return (
			<HeroCard key={i} name={item.name} cost={item.cost} img={item.img} gold={gameStats.gold.currentGold} />
		)
	})

	return <ShopWrapper>{heroesTemplate}</ShopWrapper>
}

export default HeroShop
