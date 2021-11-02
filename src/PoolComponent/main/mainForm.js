import React from 'react'
import { Button, Form, FormGroup, Input, Label, CustomInput, FormFeedback, ListGroup, ListGroupItem } from 'reactstrap'

class MainForm extends React.Component {
    state = {
        name: '',
        selectOption: '',
        error: {}
    }

    handelCgange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandel = (event) => {
        event.preventDefault()
        const { error, isValid } = this.validetion()

        if (isValid) {
            this.props.getOpenion({
                id: this.props.poll.id,
                name: this.state.name,
                selectOption: this.state.selectOption,
            })
            event.target.reset()
            this.setState({
                name: '',
                selectOption: '',
                error: {}
            })

        } else {
            this.setState({ error })
        }
    }

    validetion = () => {
        const error = {}

        if (!this.state.name) {
            error.name = 'Pleace give your name'
        } else if (this.state.name.length > 20) {
            error.name = 'Your Name is to long'
        }

        if (!this.state.selectOption) {
            error.selectOption = 'Select a option'
        }


        return {
            error,
            isValid: Object.keys(error).length === 0
        }
    }

    getOpanionValue = (responce) => {
        const option = this.props.poll.options.find(option => option.id === responce.selectOption)
        return (
            <p>{option.value}</p>
        )

    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitHandel} >
                    <div className='d-flex'>
                        <h4>Options</h4>
                        <Button
                            type='button'
                            color='warning'
                            onClick={this.props.toggleModel}
                            className='ml-auto'

                        >
                            Edit poll
                  </Button>
                        <Button
                            type='button'
                            color='danger'
                            className='ml-2'
                            onClick={() => this.props.deletePoll(this.props.poll.id)}
                        >
                            Delete
                  </Button>
                    </div>
                    {
                        this.props.poll.options.map(option => (
                            <FormGroup className='my-2' key={option.id}>
                                <Label className='d-flex'>
                                    <CustomInput
                                        type='radio'
                                        id={option.id}
                                        name='selectOption'
                                        onChange={this.handelCgange}
                                        value={option.id}
                                        invalid={this.state.error.selectOption ? true : false}

                                    />
                                    {option.value}
                                    <span
                                        style={{
                                            color: 'white',
                                            padding: '5px 20px',
                                            background: 'green',
                                            borderRadius: '5px'

                                        }}
                                        className='ml-auto'
                                    >
                                        {option.vote}
                                    </span>
                                    <span
                                        style={{
                                            color: 'white',
                                            padding: '5px 20px',
                                            background: 'orange',
                                            borderRadius: '5px'

                                        }}
                                        className='ml-2'
                                    >
                                        {this.props.poll.totalvote > 0
                                            ? ((100 * option.vote) / this.props.poll.totalvote).toFixed(2)
                                            : this.props.poll.totalvote}
                                     %
                                </span>

                                </Label>
                            </FormGroup>
                        ))
                    }
                    <FormGroup className='my-3' >
                        <Label>Enter Your Name</Label>
                        <Input
                            type='name'
                            name='name'
                            value={this.state.name}
                            onChange={this.handelCgange}
                            invalid={this.state.error.name ? true : false}
                        />
                        {this.state.error.name && <FormFeedback>{this.state.error.name}</FormFeedback>}
                    </FormGroup>
                    <Button type='submit' color='success' >Submit Your Opanion</Button>
                </Form>
                <div>
                    <ListGroup className='my-5' >
                        {this.props.poll.opinions.map(opanion => (
                            <ListGroupItem className='d-flex' >
                                <h4>{opanion.name}</h4>
                                <p className='ml-auto' >{this.getOpanionValue(opanion)}</p>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
        );
    }




}

export default MainForm;