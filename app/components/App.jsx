import React from 'react'
import * as Asana from 'Asana'
import $ from 'jquery'

import Login from 'Components/Login.jsx'
import ProjectSummary from 'Components/ProjectSummary.jsx'
import ProjectModal from 'Components/ProjectModal.jsx'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			user: null,
			modal: null,
			projects: dummyData
		}

		$.ajax({
					   url: "https://app.asana.com/api/1.0/projects/",
					   data: { signature: authHeader },
					   type: "GET",
					   beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
					   success: function(data) { console.log(data) }
					})

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(project) {

		this.setState({
			modal: project
		})

	}
	render() {

		var projectList = this.state.projects.length === 0 
				? <p>Loading...</p> 
				: this.state.projects.map((project) => {
					return <ProjectSummary handleClick={this.handleClick} key={project.id} project={project} />
				})

		return (
			<div>
				<ProjectModal handleClick={this.handleClick} project={this.state.modal}/>
				<h1>Asana Utility</h1>
				<ul>
					{projectList}
				</ul>
			</div>
		)
		
	}
}

export default App

const dummyData = [{
	id: 1,
	project_title: 'Project 1',
	tasks_completed: 5,
	tasks_remaining: 7,
	status: 'green',
	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
	due: 'May 18 2017',
	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
},{
	id: 2,
	project_title: 'Project 2',
	tasks_completed: 4,
	tasks_remaining: 3,
	status: 'green',
	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
	due: 'May 19 2017',
	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
},{
	id: 3,
	project_title: 'Project 3',
	tasks_completed: 1,
	tasks_remaining: 9,
	status: 'green',
	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
	due: 'May 18 2017',
	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
},{
	id: 4,
	project_title: 'Project 4',
	tasks_completed: 7,
	tasks_remaining: 7,
	status: 'orange',
	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
	due: 'May 18 2017',
	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
},{
	id: 5,
	project_title: 'Project 5',
	tasks_completed: 6,
	tasks_remaining: 3,
	status: 'red',
	team_members: ['Doug', 'Mark', 'Jack', 'Brenda', 'Ming'],
	due: 'May 18 2017',
	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula rhoncus justo. Proin sit amet urna nunc. Integer sit amet augue cursus, volutpat turpis vel, tristique sem. Proin aliquam mi at augue porta ullamcorper. Duis nec augue finibus, laoreet nisi rhoncus, blandit ipsum. Fusce molestie varius sodales.'
}]