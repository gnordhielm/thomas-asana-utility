import React from 'react'

class ProjectSummary extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		var {project_title, tasks_remaining, tasks_completed, status, due, description} = this.props.project

		return (
			<li className={status}>
				<h2>{project_title}</h2>
				<p>{tasks_completed} tasks completed.</p>
				<p>{tasks_remaining} tasks remaining.</p>
				<p>Due {due}</p>
				<hr/>
				<p>{description}</p>
			</li>
		)
	}
}

export default ProjectSummary