import React from 'react'
import shortid from 'shortid'
import MyForm from './form'

const defaultOption = [
    { id: shortid.generate(), value: '', vote: 0 },
    { id: shortid.generate(), value: '', vote: 0 }
]

class PollForm extends React.Component {
    state = {
        title: '',
        description: '',
        options: defaultOption,
        error: {}
    }

    componentDidMount() {
        const { poll } = this.props
        if (poll && Object.keys(poll).length !== 0) {
            this.setState({
                title: poll.title,
                description: poll.description,
                options: poll.options
            })
        }
    }

    changeHandel = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    optionChange = (event, index) => {
        const options = [...this.state.options]
        options[index].value = event.target.value
        this.setState({ options })
    }

    createOption = () => {
        const { options } = this.state
        if (options.length < 5) {
            options.push({
                id: shortid.generate(),
                value: '',
                vote: 0
            });
            this.setState({ options })
        } else {
            alert('You can create only 5 options')
        }
    }

    deleteOption = index => {
        const { options } = this.state
        if (options.length >= 2) {
            options.splice(index, 1)
            this.setState({ options })
        } else {
            alert('You have at last 2 option for delete')
        }

    }

    submitForm = event => {
        event.preventDefault()
        const { isValide, error } = this.validateForm()

        if (isValide) {
            const { title, description, options } = this.state
            const poll = {
                title,
                description,
                options
            };
            if (this.props.isUpdate) {
                poll.id = this.props.poll.id
                this.props.submit(poll);
                alert('Update Successfully')
            } else {
                this.props.submit(poll)
                event.target.reset()
                this.setState({
                    title: '',
                    description: '',
                    options: defaultOption,
                    error: {}
                })
            }

        } else {
            this.setState({ error })
        }
    }

    validateForm = () => {
        const error = {}
        const { title, description, options } = this.state

        if (!title) {
            error.title = 'Enter a title'
        } else if (title.length < 10) {
            error.title = 'Title is short'
        } else if (title.length > 50) {
            error.title = 'Title is too big'
        }

        if (!description) {
            error.description = 'Enter a description'
        }

        const optionError = []

        options.forEach((option, index) => {
            if (!option.value) {
                optionError[index] = 'Option text empety'
                //  optionError.push('Option text empety')
            }
        })

        if (optionError.length > 0) {
            error.options = optionError
        }

        return {
            error,
            isValide: Object.keys(error).length === 0
        }
    }

    render() {
        const { title, description, options, error } = this.state
        return (
            <MyForm
                title={title}
                description={description}
                options={options}
                error={error}
                changeHandel={this.changeHandel}
                optionChange={this.optionChange}
                createOption={this.createOption}
                deleteOption={this.deleteOption}
                submitForm={this.submitForm}
                buttonValue={this.props.buttonValue || 'Create Poll'}
            />
        );
    }

}

export default PollForm;