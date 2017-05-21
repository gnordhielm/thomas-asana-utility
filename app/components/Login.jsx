import React from 'react'
import * as Asana from 'Asana'

class Login extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<h2>Please log in.</h2>
				<a href={Asana.AUTH_ENDPOINT}>
					<button>Log in</button>
				</a>
			</div>
		)
	}
}

export default Login