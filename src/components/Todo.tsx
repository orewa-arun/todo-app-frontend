import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { updateTodo } from "../API";
import TodoModal from "./TodoModal";

type Props = {
    todo : Todo;
    modifyTodo : (todoId : string, obj : {name : string, description : string}, todoStatus : boolean) => Promise<void>;
    eraseTodo : (todo : Todo) => Promise<void>;
}

const Todo : React.FC<Props> = ({todo, modifyTodo, eraseTodo}) => {

  const [updatedTodo, setUpdatedTodo] = useState<Todo>(todo);
  const [completionStatus, setCompletionStatus] = useState(todo.status);

  const updateCompletionStatus = async() => {
    await updateTodo(todo._id, {name : todo.name, description : todo.description}, !completionStatus);
    setCompletionStatus(!completionStatus);
  }

  const editTodo = async(obj : {name : string, description : string}) => {
    modifyTodo(todo._id, {name : obj.name, description : obj.description}, !completionStatus);
    setUpdatedTodo({
      ...updatedTodo,
      ...obj
    });
  }

  const deleteTodo = async() => {
    await eraseTodo(todo);
  }

  return (
    <Container>
      <Card style={{width: '18rem'}}>
          <Card.Body>
              <Card.Title>
                {updatedTodo.name}
                <TodoModal createOrUpdateTodo={editTodo} editing={true}/>
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