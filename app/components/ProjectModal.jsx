import React from 'react'

class ProjectModal extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        if (!this.props.project)
            return null

        var {
            current_status,
            name,
            modified_at,
            created_at,
            id,
            color,
            members,
            workspace
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

        var teamMembersList = members.map((member, i, arr) => {
            if (i === arr.length - 1)
                return `and ${member.name}.`
            return `${member.name}, `
        })

        // Display team members
            var membersList = members.map((member) => {
              var names = member.name.split(' ')
              var initials = ''
              initials += names[0].split('')[0]
              if (names[1]) {
                initials += names[1].split('')[0]
              } else {
                initials += names[0].split('')[1]
              }
              return (<li className='whitecircle' key={member.id}>
                        {initials}
                      </li>)
            })

            var workspace = workspace.name;

        return (
            <div className='modal-bg'>
                <div className={`${color} modal`}>
                <p className='close-button' onClick={() => this.props.handleClick(null)}>&#10005;</p>

                    <div className='left'>
                        <h2>{name}</h2>
                        <p>{this.props.taskremaining} Remaining | Completed {this.props.taskcompleted}</p>
                        <ul className={`${color}-text membersList`}>{membersList}</ul>
                    </div>
                    <div className='right'>

                        <p>Updated: {renderDate(modified_at)}</p>
                        <p>{text}</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default ProjectModal
