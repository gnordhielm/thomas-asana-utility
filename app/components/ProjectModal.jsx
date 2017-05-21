import React from 'react'

class ProjectModal extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {

		if (!this.props.project) return null

		var {color, name, due_date, created_at, id, members} = this.props.project

		var renderDate = (date) => {
			return new Date(date).toDateString()
		}

		var teamMembersList = members.map((member, i, arr) => {
			if (i === arr.length - 1) return `and ${member.name}.`
			return `${member.name}, `
		})

		return (
			<div className='modal-bg'>
				<div className='modal'>
					<button onClick={() => this.props.handleClick(null)}>Close</button>
					<h2>{name}</h2>
					<p>Created: {renderDate(created_at)}</p>
					<p>Due: {renderDate(due_date)}</p>
					<p>Status: {status || 'none'}</p>
					<p>Color: {status || 'none'}</p>
					
					<hr/>
					<p>Members: {teamMembersList}</p>
					
				</div>
			</div>
		)
	}
}

export default ProjectModal