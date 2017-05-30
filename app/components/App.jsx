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
							 $.ajax({
								 url: `https://app.asana.com/api/1.0/projects/${item.id}/tasks`,
								 type: "GET",
								 headers: {
									 "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
								 },
								 success: function(res) {
									 var newProjects = that.state.projects.slice()
									 var thisProject = response.data
									 thisProject.tasks = res.data
									 newProjects.push(thisProject)
									 that.setState({
										 projects: newProjects
									 })
								 }

							 })

			       }
	       	})
        })

      }

     })
		}, 1500)
	}
	// componentDidMount() {
	// 	var that = this
	// 	var currentProjects = that.state.projects.slice()
	// 	setTimeout(() => {
	// 		currentProjects.map((proj) => {
	// 			return proj.tasks.map((task) => {
	// 				return $.ajax({
	// 					url: `https://app.asana.com/api/1.0/tasks/${task.id}`,
	// 					type: "GET",
	// 					headers: {
	// 						"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
	// 					},
	// 					success: function(fullTask) {
	// 						return fullTask
	// 					}
	// 				})
	// 			})
	// 		})
	// 		console.log(currentProjects)
	// 	}, 3000)
	// }
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
			  <ul className='navtitle'>
					<li>Job Status Board</li>
					<li className='logout' onClick={this.logOut}>Log out</li>
					</ul>
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
