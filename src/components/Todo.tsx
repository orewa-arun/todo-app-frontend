import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { updateTodo, deleteTodoById } from "../API";
import TodoModal from "./TodoModal";

type Props = {
    todo : Todo;
    modifyTodo : (todo : Todo) => void;
    eraseTodo : (todo : Todo) => void;
}

const Todo : React.FC<Props> = ({todo, modifyTodo, eraseTodo}) => {

  const [updatedTodo, setUpdatedTodo] = useState<Todo>(todo);
  const [completionStatus, setCompletionStatus] = useState(todo.status);

  const updateCompletionStatus = async() => {
    await updateTodo(todo._id, {name : updatedTodo.name, description : updatedTodo.description}, !completionStatus);
    setCompletionStatus(!completionStatus);
  }

  const editTodo = async(editedTodo : {name : string, description : string}) : Promise<Todo | undefined> => {
    const latestTodo = await updateTodo(todo._id, editedTodo, completionStatus);
    // Updates partially
    setUpdatedTodo({
      ...updatedTodo,
      ...editedTodo
    });
    return latestTodo;
  }

  const deleteTodo = async() => {
    await deleteTodoById(todo._id);
    eraseTodo(todo);
  }

  return (
    <Container>
      <Card style={{width: '18rem'}}>
          <Card.Body>
              <Card.Title>
                {updatedTodo.name}
                <TodoModal createOrUpdateTodo={editTodo} editing={true} addOrUpdateTodo={modifyTodo}/>
                <Button variant="danger" onClick={deleteTodo}>Delete</Button>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{updatedTodo.description}</Card.Subtitle>
              <Card.Text>{completionStatus? <span>Done !</span> : <span> Not Done Bitch !!</span>}</Card.Text>
              <Button variant='primary' onClick={updateCompletionStatus}>
                {
                  completionStatus? (
                    <span> Mark as incomplete </span>
                  ) : (
                    <span> Mark as completed</span>
                  )
                }
              </Button>
          </Card.Body>
      </Card>
    </Container>
  )
}

export default Todo;