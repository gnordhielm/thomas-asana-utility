import React from 'react'

class Login extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<h2>Please log in.</h2>
				<button>Facebook</button>
				<button>Google</button>
			</div>
		)
	}
}

export default Login