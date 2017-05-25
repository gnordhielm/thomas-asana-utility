import React from 'react'
import * as Asana from 'Asana'
import $ from 'jquery'

import {browserHistory} from 'react-router'

import Login from 'Components/Login.jsx'
import ProjectSummary from 'Components/ProjectSummary.jsx'
import ProjectModal from 'Components/ProjectModal.jsx'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modal: null,
			projects: []
		}

		this.handleClick = this.handleClick.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
	}
	componentWillMount(){

		var that = this

		setTimeout(() => {
			$.ajax({
       url: "https://app.asana.com/api/1.0/projects",
       type: "GET",
       headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}`},
       success: function(response) {

       	response.data.forEach((item) => {
       		$.ajax({
			       url: `https://app.asana.com/api/1.0/projects/${item.id}`,
			       type: "GET",
			       headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}`},
			       success: function(response) {
							console.log('success')
			       	 var newProjects = that.state.projects.slice()
			       	 newProjects.push(response.data)
			         that.setState({
			           projects: newProjects
			         })
			       }
	       	})
        })

      }

     })
		}, 1500)
	}
	handleClick(project) {
		this.setState({
			modal: project
		})
	}
	logOut(){
		localStorage.setItem('authCode', '')
		localStorage.setItem('accessToken', '')
		localStorage.setItem('refreshToken', '')
		browserHistory.replace('/')
	}
	render() {


		var projectList = this.state.projects.length === 0
				? <p>Loading...</p>
				: this.state.projects.map((project) => {
					return <ProjectSummary handleClick={this.handleClick} key={project.id} project={project} />
				})

		return (
			<div>
			  <div className='navbar'>
			  <h1>Job Status Board</h1>
					<button className='logout' onClick={this.logOut}>Log out</button>
					<ProjectModal handleClick={this.handleClick} project={this.state.modal}/>
				</div>

				<ul>
					{projectList}
				</ul>
			</div>
		)

	}
}

export default App
