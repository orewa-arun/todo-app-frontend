import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { updateTodo } from "../API";
import CreateTodoModal from "./CreateTodoModal";

type Props = {
    todo : Todo;
}

const Todo : React.FC<Props> = ({todo}) => {

  const [updatedTodo, setUpdatedTodo] = useState<Todo>(todo);
  const [completionStatus, setCompletionStatus] = useState(todo.status);

  const updateCompletionStatus = async() => {
    await updateTodo(todo._id, {name : updatedTodo.name, description : updatedTodo.description}, !completionStatus);
    setCompletionStatus(!completionStatus);
  }

  const editTodo = async(editedTodo : {name : string, description : string}) => {
    await updateTodo(todo._id, editedTodo, completionStatus);
    // Updates partially
    setUpdatedTodo({
      ...updatedTodo,
      ...editedTodo
    });
  }

  return (
      <Card style={{width: '18rem'}}>
          <Card.Body>
              <Card.Title>
                {updatedTodo.name}
                <CreateTodoModal addNewTodo={editTodo} editing={true}/>
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
  )
}

export default Todo;