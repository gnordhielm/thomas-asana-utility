import React from 'react'

class ProjectSummary extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var {
            color,
            name,
            due_date,
            created_at,
            current_status,
            modified_at,
            id,
            members
        } = this.props.project

        if (!color) {
            current_status
                ? color = current_status.color
                : color = 'green'
        }

        if (current_status) {
					var text = current_status.text;
				} else {
					var text = 'No update available.'
				}
        var renderDate = (date) => {
            return new Date(date).toDateString()
        }

        // var renderColor = (color) => {
        // 	return new Color(color)
        // }

        var teamMembersList = members.map((member, i, arr) => {
            if (i === arr.length - 1)
                return `and ${member.name}.`
            return `${member.name}, `
        })

        return (
            <li className={`${color} project-summary`} onClick={() => this.props.handleClick(this.props.project)}>
                <h2>{name}</h2>
                <p>Remaining | Completed
                </p>
                <p>Team: {teamMembersList}</p>
                <p>Updated: {renderDate(modified_at)}</p>
                <p>{text}</p>
            </li>
        )
    }
}

export default ProjectSummary
