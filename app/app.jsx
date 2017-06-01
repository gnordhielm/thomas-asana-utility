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
		browserHistory.replace('/')
	}
}

var loginRedirect = () => {
	// already logged in, info is stored in a cookie
}
// const dummyData = [{
// 	id: 1,
// 	project_title: 'Project 1',
// 	tasks_completed: 5,
// 	tasks_remaining: 7,
// 	status: 'green',
// 	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
// 	due: 'May 18 2017',
// 	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
// },{
// 	id: 2,
// 	project_title: 'Project 2',
// 	tasks_completed: 4,
// 	tasks_remaining: 3,
// 	status: 'green',
// 	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
// 	due: 'May 19 2017',
// 	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
// },{
// 	id: 3,
// 	project_title: 'Project 3',
// 	tasks_completed: 1,
// 	tasks_remaining: 9,
// 	status: 'green',
// 	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
// 	due: 'May 18 2017',
// 	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
// },{
// 	id: 4,
// 	project_title: 'Project 4',
// 	tasks_completed: 7,
// 	tasks_remaining: 7,
// 	status: 'orange',
// 	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
// 	due: 'May 18 2017',
// 	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
// },{
// 	id: 5,
// 	project_title: 'Project 5',
// 	tasks_completed: 6,
// 	tasks_remaining: 3,
// 	status: 'red',
// 	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
// 	due: 'May 18 2017',
// 	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
// }]

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/">
			<IndexRoute component={Login} onEnter={loginRedirect} />
			<Route path="projects" component={App} onEnter={authCheck} />
		</Route>
	</Router>,
	document.getElementById('app')
)
