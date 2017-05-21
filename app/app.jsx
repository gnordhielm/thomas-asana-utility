import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory, Route, Router, IndexRoute} from 'react-router'

import * as Asana from 'Asana'
import $ from 'jquery'

import App from 'Components/App.jsx'
import Login from 'Components/Login.jsx'

// load app css
require('style-loader!css-loader!sass-loader!AppStyles')

// Auth middleware
var authCheck = () => {
	console.log('authcheck')
	// unauthenticated - coming to redirect uri
	if (window.location.search) {
		console.log('got search')
		
		console.log('set authcode')
		// store the code in localstorage
		var authCode = decodeURIComponent(window.location.search.split('?code=')[1].split('&state')[0])
		localStorage.setItem('authCode', authCode)
		
		// console.log('reset location')
		// window.location.search = ''

		// get refresh token and whatnot
		$.ajax({
       url: "https://app.asana.com/-/oauth_token",
       data: { 
					code: authCode,
					client_id: Asana.CLIENT_ID,
					client_secret: Asana.CLIENT_SECRET,
					redirect_uri: Asana.REDIRECT_URI,
					grant_type: 'authorization_code'
       },
       type: "POST",
       success: function(data) { 
					localStorage.setItem('accessToken', data.access_token)
					localStorage.setItem('refreshToken', data.refresh_token)
       }
    })


	// already authenticated, have a token
	} else if (localStorage.getItem('refreshToken')) {
			$.ajax({
       url: "https://app.asana.com/-/oauth_token",
       data: { 
					code: localStorage.getItem('refreshToken'),
					client_id: Asana.CLIENT_ID,
					client_secret: Asana.CLIENT_SECRET,
					redirect_uri: Asana.REDIRECT_URI,
					grant_type: 'authorization_code'
       },
       type: "POST",
       success: function(data) { 
					localStorage.setItem('accessToken', data.access_token)
       }
    })

	// unauthenticated
	} else {
		window.location.replace('/')
	}
}

var loginRedirect = () => {
	// already logged in, info is stored in a cookie
}

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/">
			<IndexRoute component={Login} onEnter={loginRedirect}/>
			<Route path="projects" component={App} onEnter={authCheck}>
				<Corkboard/>
			</Route>
		</Route>
	</Router>,
	document.getElementById('app')
)