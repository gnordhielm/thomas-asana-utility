import React from 'react'
import * as Asana from 'Asana'

class Login extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='login'>
				<h1>Asana Project Heads Up</h1>
				<a href={Asana.AUTH_ENDPOINT}>
					<button className='login-button'>Log in</button>
				</a>
			</div>
		)
	}
}

export default Login
