import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

// load app css
require('style!css!sass!./styles/app.scss')

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)