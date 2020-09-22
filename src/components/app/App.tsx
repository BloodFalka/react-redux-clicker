import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../../redux/store'

import MainContent from '../mainContent/mainContent'
import Navbar from '../navbar/navbar'

function App() {
	return (
		<Router>
			<Provider store={store}>
				<Navbar />
				<MainContent />
			</Provider>
		</Router>
	)
}

export default App
