import React from 'react'
import { Form, FormFeedback, Button, Input, FormGroup, Label } from 'reactstrap'

const MyForm = ({
    title,
    description,
    options,
    changeHandel,
    optionChange,
    createOption,
    deleteOption,
    submitForm,
    error,
    buttonValue
}) => (
        <Form onSubmit={submitForm} >
            <FormGroup>
                <Label for='title' >Title</Label>
                <Input
                    type='name'
                    name='title'
                    id='title'
                    placeholder='Enter a title'
                    onChange={changeHandel}
                    value={title}
                    invalid={error.title ? true : false}
                />
                {error.title && <FormFeedback>{error.title}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for='description' >Title</Label>
                <Input
                    type='textarea'
                    name='description'
                    placeholder='Enter description'
                    id='description'
                    onChange={changeHandel}
                    value={description}
                    invalid={error.description ? true : false}
                />
                {error.description && <FormFeedback>{error.description}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label>
                    Enter Options
                <span
                        style={{
                            marginLeft:'30px',
                            background:'green',
                            color:'white',
                            padding:'5px',
                            borderRadius:'5px',
                            cursor:'pointer'
                        }}
                        onClick={createOption}
                    >Add option</span>
                </Label>
                {options.map((option, index) => (
                    <div className='d-flex my-2' key={option.id} >
                        <Input
                            value={option.value}
                            onChange={(e) => optionChange(e, index)}
                            invalid={
                                error.options && error.options[index]
                                    ? true
                                    : false
                            }

                        />
                        <Button
                            onClick={() => deleteOption(index)}
                            disabled={options.length <= 2}
                            color='danger'
                            className='ml-2'
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </FormGroup>

            <Button color='primary' type='submit' >
                {buttonValue}
            </Button>

        </Form>
    );

export default MyForm;