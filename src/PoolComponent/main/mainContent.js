import React from 'react'
import MainForm from './mainForm'
import PollForm from '../pollform/pollform'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

class MainContent extends React.Component {

    state = {
        isOpen: false
    }

    toggleModel = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        if (Object.keys(this.props.poll).length === 0) {
            return (
                <div>
                    <h4>Welcome To My Poll Application</h4>
                </div>
            );
        }

        const { poll, getOpenion, updatePoll, deletePoll } = this.props
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br />
                <MainForm
                    poll={poll}
                    toggleModel={this.toggleModel}
                    getOpenion={getOpenion}
                    deletePoll={deletePoll}
                />
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModel} >
                    <ModalHeader toggle={this.toggleModel} >
                        Update Your Poll
             </ModalHeader>
                    <ModalBody>
                        <PollForm
                            submit={updatePoll}
                            poll={poll}
                            buttonValue='Update Poll'
                            isUpdate={true}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default MainContent;