import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/app/App'
import fixVh from './modules/fixVh'

fixVh()

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
