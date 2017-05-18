import React from 'react'

import Login from './Login'

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		if (true) { // if the user is logged in
			return (
				<div>
					<h1>Asana Utility</h1>
					<h2>Logged in...</h2>
				</div>
			)
		} else {
			return (
				<div>
					<Login/>
				</div>
			)
		}
	}
}

export default App