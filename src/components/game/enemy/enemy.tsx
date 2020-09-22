import React from 'react'
import styled from 'styled-components'
import background from '../../../assets/img/backgrounds/pumkinField.jpg'
import bellsImg from '../../../assets/img/valutes/bells.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectGameStats } from '../../../redux/selectors/shop-selector'
import { selectEnemy } from '../../../redux/selectors/enemy-selector'
import { actions as enemyActions, EnemyType } from '../../../redux/reducers/enemy-reducer'
import { actions as shopActions } from '../../../redux/reducers/shop-reducer'
import ProgressBar from 'react-bootstrap/esm/ProgressBar'
import { GameStatsType } from '../../../api/gameStatsAPI'

const BattleFieldWrapper = styled.div`
	position: relative;
	cursor: pointer;
	background: url(${background}) center/cover no-repeat;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`

const EnemyImg = styled.img`
	height: 70vh;
`

const Bells = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 2%;
	left: 2%;
	font-size: 30px;
	text-shadow: 2px 2px 3px black;
	color: white;
	img {
		margin-right: 10px;
		height: 40px;
	}
`

const Lvl = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 2%;
	right: 2%;
	font-size: 30px;
	text-shadow: 2px 2px 3px black;
	color: white;
`

const EnemyName = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 2%;
	font-size: 30px;
	text-shadow: 2px 2px 3px black;
	color: white;
`

const StyledProgressBar = styled(ProgressBar)`
	position: absolute;
	bottom: 5%;
	font-size: 20px;
	color: white;
	text-shadow: 2px 2px 3px black;
	width: 300px;
	height: 25px;
`

type Props = {
	enemy: EnemyType,
	gameStats: GameStatsType,
}

const Enemy: React.FC<Props> = ({ enemy, gameStats }) => {
	const dispatch = useDispatch()

	const onClickHandle = () => {
		if (enemy.currentHp <= 0) {
			dispatch(enemyActions.changeEnemy())
			dispatch(shopActions.increaseGold(1))
		} else {
			dispatch(enemyActions.decreaseCurrentHp(1))
			console.log(enemy.currentHp)
		}
	}

	return (
		<BattleFieldWrapper onClick={onClickHandle}>
			<Bells>
				<img src={bellsImg} alt="bells" />
				{gameStats.gold.currentGold}
			</Bells>
			<Lvl> Lvl:{gameStats.lvl.currentLvl}</Lvl>
			<EnemyName>{enemy.name}</EnemyName>
			<EnemyImg src={enemy.img} alt="enemy" />

			<StyledProgressBar
				animated
				variant="danger"
				now={enemy.currentHp}
				max={enemy.maxHp}
				label={`${enemy.currentHp}/${enemy.maxHp}`}
			/>
		</BattleFieldWrapper>
	)
}

export default Enemy
