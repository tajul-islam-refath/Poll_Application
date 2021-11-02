import React from 'react'
import { Input, Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PollList from './pollList'
import PollFrom from '../pollform/pollform'

class SideBar extends React.Component {

    state = {
        isOpen: false
    }

    toggleModel = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div style={{ background: '#efefef', padding: '10px' }}>
                <div className='d-flex my-3' >
                    <Input
                        type='search'
                        placeholder='search list item'
                        value={this.props.searchValue}
                        onChange={event => this.props.SearchHandel(event.target.value)}

                    />
                    <Button
                        color='success'
                        onClick={this.toggleModel}
                        className='mx-2'
                    >
                        New
                </Button>
                </div>
                <h3>Poll Lists</h3>
                <hr />
                <PollList
                    polls={this.props.polls}
                    selectPoll={this.props.selectPoll}
                />

                <Modal isOpen={this.state.isOpen} toggle={this.toggleModel} >
                    <ModalHeader toggle={this.toggleModel} >
                        Create New Poll
                   </ModalHeader>
                    <ModalBody>
                        <PollFrom submit={this.props.addNewPoll} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default SideBar;