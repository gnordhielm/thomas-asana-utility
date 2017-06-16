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

// Display color of modal

        if (!color) {
            current_status
                ? color = current_status.color
                : color = 'default'
        }

        if (color !== 'red' && color !== 'green' && color !== 'yellow' || color === null) {
          color = 'default'
        }
// Display text of modal

        if (current_status) {
            var text = current_status.text;
        } else {
            var text = 'No update available.'
        }

// Display project date

        var renderDate = (date) => {
            return new Date(date).toDateString()
        }

// Display team members

        var teamMembersList = members.map((member, i, arr) => {
            if (i === arr.length - 1)
                return `and ${member.name}.`
            return `${member.name}, `
        })
        
            var membersList = members.map((member) => {
              var names = member.name.split(' ')
              var initials = ''
              initials += names[0].split('')[0]
              if (names[1]) {
                initials += names[1].split('')[0]
              } else {
                initials += names[0].split('')[1]
              }
              return (<li className='whitecircle-modal' key={member.id}>
                        {initials}
                      </li>)
            })

            var workspace = workspace.name;

        return (
            <div className='modal-bg' onClick={() => this.props.handleClick(null)}>
                <div className={`${color} modal`}>
                <p className='close-button'></p>

                    <div className='left'>
                        <p className='modal-name'>{name}</p>
                        <p className='modal-task'>{this.props.taskremaining} Remaining | Completed {this.props.taskcompleted}</p>
                        <ul className={`${color}-text modal-membersList`}>{membersList}</ul>
                    </div>
                    <div className='right'>

                        <p className='modal-updated'>{renderDate(modified_at)}</p>
                        <p className='modal-text'>{text}</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default ProjectModal
