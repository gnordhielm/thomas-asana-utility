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
			modal: null
		}

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(project) {
		this.setState({
			modal: project
		})
	}
	render() {
		var projectList = this.props.route.projects.length === 0 
				? <p>Loading...</p> 
				: this.props.route.projects.map((project) => {
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