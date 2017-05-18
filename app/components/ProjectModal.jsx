import React from 'react'

class ProjectModal extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {

		if (!this.props.project) return <div>No project...</div>

		var {project_title, tasks_remaining, tasks_completed, status, due, description, team_members} = this.props.project

		var teamMembersList = team_members.map((member) => {
			return `<li>${member}</li>`
		})

		return (
			<li className={status}>
				<h2>{project_title}</h2>
				<p>{tasks_completed} tasks completed.</p>
				<p>{tasks_remaining} tasks remaining.</p>
				<p>Due {due}</p>
				
				<hr/>

				<ul>
					{teamMembersList}
				</ul>
				
				<hr/>
				
				<p>{description}</p>
			</li>
		)
	}
}

export default ProjectModal