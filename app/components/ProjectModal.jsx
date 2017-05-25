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
            members
        } = this.props.project

				if (!color) {
            current_status
                ? color = current_status.color
                : color = 'green'
        }

        var renderDate = (date) => {
            return new Date(date).toDateString()
        }

        var teamMembersList = members.map((member, i, arr) => {
            if (i === arr.length - 1)
                return `and ${member.name}.`
            return `${member.name}, `
        })

        return (
            <div className='modal-bg'>
                <div className={`${color} modal`}>
                    <button className='close-button' onClick={() => this.props.handleClick(null)}>Close</button>
                    <h2>{name}</h2>
                    <p>Remaining | Completed</p>
                    <p>Team: {teamMembersList}</p>
                    <p>Updated: {renderDate(modified_at)}</p>
                    <hr/>
                    <p>Description: Iceland pinterest wolf, four dollar toast narwhal blog pug listicle. Butcher blue bottle shabby chic, raw denim green juice keytar XOXO etsy cold-pressed pour-over lomo air plant gochujang synth quinoa. Chillwave farm-to-table retro fanny pack blue bottle, locavore salvia synth.</p>

                    <hr/>

                </div>
            </div>
        )
    }
}

export default ProjectModal
