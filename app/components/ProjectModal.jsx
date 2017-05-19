import React from 'react'

class ProjectModal extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {

		if (!this.props.project) return null

		var {project_title, tasks_remaining, tasks_completed, status, due, description, team_members} = this.props.project

		var teamMembersList = team_members.map((member) => {
			return `<li>${member}</li>`
		})

		return (
			<div className='modal-bg'>
				<div className='modal'>
					<button onClick={() => this.props.handleClick(null)}>Close</button>
					<h2>{project_title}</h2>
					<p>{tasks_completed} tasks completed | {tasks_remaining} tasks remaining</p>
					<p>Due: {due}</p>
					<p>Status: {status}</p>
					
					<hr/>

					<ul>
						{teamMembersList}
					</ul>
					
					<hr/>
					
					<p>{description}</p>
				</div>
			</div>
		)
	}
}

export default ProjectModal