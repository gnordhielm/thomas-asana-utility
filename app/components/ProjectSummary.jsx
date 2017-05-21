import React from 'react'

class ProjectSummary extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		var {color, name, due_date, created_at, id} = this.props.project

		if (!color) color = 'green'

		var renderDate = (date) => {
			return new Date(date).toDateString()
		}

		return (
			<li className={`${color} project-summary`} onClick={() => this.props.handleClick(this.props.project) }>
				<h2>{name}</h2>
				<hr/>
				<p>Created {renderDate(created_at)}</p>
				<p>Due {renderDate(due_date)}</p>
			</li>
		)
	}
}

export default ProjectSummary