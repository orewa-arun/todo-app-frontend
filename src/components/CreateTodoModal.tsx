import { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

type Props = {
    addNewTodo : (object : {name : string, description : string}) => void;
    editing? : boolean
}

const CreateTodoModal : React.FC<Props> = ({addNewTodo, editing}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const [formData, setFormData] = useState({
        name : '',
        description : ''
    });

    // To handle changes in input
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    }

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        addNewTodo(formData);
        handleClose();
    }


    return (
        <Container>
            {/* This button is what you will be re-positioning when you re-position this component! */}
            <Button variant='primary' onClick={handleOpen}>
                {editing? "edit" : "Create New task"}
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> Create a New Todo! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTodoName">
                            <Form.Label>Todo Name : </Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} placeholder="Enter task name" />
                            <Form.Text className="text-muted">
                                Make sure your todo name is on your ass.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTodoDescription">
                            <Form.Label>Description : </Form.Label>
                            <Form.Control type="text" name="description" onChange={handleChange} placeholder="Enter Description" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default CreateTodoModal;