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
			projects: [],
			taskcompleted: 0,
			taskremaining: 0,
			projectsToShow: []
		}



		this.handleClick = this.handleClick.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
		this.changeDisplay = this.changeDisplay.bind(this)

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
									 newProjects.sort(function(a,b){
										 if (a.name < b.name) return -1;
										 if (a.name > b.name) return 1;
										 return 0;
									 })

								 		var activeProjects = that.state.projectsToShow.slice()
										if (thisProject.team.name == 'Active') {
								 				activeProjects.push(thisProject)
								 			}
									 that.setState({
										 projects: newProjects,
										 projectsToShow: activeProjects
									 })
								 }

							 })

			       }
	       	})
        })

      }

     })
	 }, 0)
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
	handleClick(project, remaining, completed) {
		this.setState({
			modal: project,
			taskremaining: remaining,
			taskcompleted: completed
		})
	}

	changeDisplay(category) {
		var activeProjects = []
		this.state.projects.forEach((project) => {
			if (project.team.name == category) {
				activeProjects.push(project)
			}
		})

		this.setState({
			projectsToShow: activeProjects
		})
	}
	logOut(){
		localStorage.setItem('authCode', '')
		localStorage.setItem('accessToken', '')
		localStorage.setItem('refreshToken', '')
		browserHistory.replace('/')
	}
	render() {

		var teams = [];
		var allProjects = this.state.projects.slice()
		allProjects.forEach((project) => {
			var duplicate = teams.filter((team) => {
				if (team.name == project.team.name) {
					return team
				}
			})

			if (duplicate.length == 0) {
				teams.push({
					name: project.team.name,
					count: 1
				})
			} else {
				teams.map((team) => {
					if (team.name == duplicate[0].name) {
						team.count += 1
					}
				})
			}
		})

		teams.sort(function(a,b){
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		})

		var teamList = teams.map((team) => {
			var space = team.name
    	return (
        <li onClick={() => this.changeDisplay(space)}>
          {space} ({team.count})
        </li>
      )
    })

		var projectList = this.state.projectsToShow.length === 0
				? <p>Loading...</p>
				: this.state.projectsToShow.map((project) => {
					return <ProjectSummary handleClick={this.handleClick} key={project.id} project={project} />
				})

		return (
			<div>
			  <div className='navbar'>
					<h1 className='navJob'>Job Status Board</h1>
				  <ul className='navright'>
						{teamList}
						<li className='logout' onClick={this.logOut}>Log out</li>
					</ul>
					<ProjectModal handleClick={this.handleClick} taskremaining={this.state.taskremaining} taskcompleted={this.state.taskcompleted} project={this.state.modal}/>
				</div>

				<ul>
					{projectList}
				</ul>
			</div>
		)

	}
}

export default App
