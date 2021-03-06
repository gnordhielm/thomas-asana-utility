import React from 'react'
import $ from 'jquery'

class ProjectSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          tasks: []
        }
    }

    componentWillMount() {
      var that = this
      setTimeout(() => {
        that.props.project.tasks.forEach((task) => {
          $.ajax({
            url: `https://app.asana.com/api/1.0/tasks/${task.id}`,
						type: "GET",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
						},
            success: function(response) {
              var newTasks = that.state.tasks.slice()
              newTasks.push(response.data)
              if (that.refs.myRef) {
              that.setState({
                tasks: newTasks
              })
              }
            }
          })
        })
      }, 0)
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
// Display color
        if (!color) {
            current_status
                ? color = current_status.color
                : color = 'default'
        }

        if (color !== 'red' && color !== 'green' && color !== 'yellow' || color === null) {
          color = 'default'
        }

// Display text according to length...
        if (current_status && current_status.text.length > 200) {
					var text = current_status.text.split('\n', 1) + ' ...';
				}
        else if (current_status) {
          var text = current_status.text;
        } else {
					var text = 'No update available.'
				};

// Display the date
        var renderDate = (date) => {
            return new Date(date).toDateString()
        };

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
          return (<li className='whitecircle' key={member.id}>
                    {initials}
                  </li>)
        })

// Display tasks remaining and Completed
        var taskcompleted = 0;
        var taskremaining = 0;
        this.state.tasks.forEach((task) => {
          task.completed ? taskcompleted += 1 : taskremaining += 1
        })



// Displayed and repeated
        return (


            <li ref='myRef' className={`${color} project-summary`} onClick={() => this.props.handleClick(this.props.project, taskremaining, taskcompleted)}>
                <div className="content">
                <p className='summary-name'>{name}</p>
                <p className='taskline' key={this.state.tasks}>{taskremaining} Remaining | Completed {taskcompleted}
                </p>
                <ul className={`${color}-text membersList`}>{membersList}</ul>
                <p className='updated'>{renderDate(modified_at)}</p>
                <p className='project-text'>{text}</p>
                </div>
            </li>
        )
    }
}

export default ProjectSummary
