const fixVh = () => {
	const fixedVhProperty = () => {
		let vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}
	fixedVhProperty()
	window.addEventListener('resize', () => {
		fixedVhProperty()
	})
}

export default fixVh
