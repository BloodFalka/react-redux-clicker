import React from 'react'
import styled from 'styled-components'
import spinner from '../../../assets/img/spinner.png'

const Wrapper = styled.div`
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Spinner = () => {
	return (
		<Wrapper className="spinner">
			<img src={spinner} alt="spinner" />
		</Wrapper>
	)
}

export default Spinner
