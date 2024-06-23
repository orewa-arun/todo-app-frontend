import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { updateTodo } from "../API";

type Props = {
    todo : Todo;
}

const Todo : React.FC<Props> = ({todo}) => {
  const [completionStatus, setCompletionStatus] = useState(false);

  const updateCompletionStatus = () => setCompletionStatus(!completionStatus);

  useEffect(() => {
    updateTodo(todo._id, {name : todo.name, description : todo.description}, completionStatus);
  },[completionStatus]);

  return (
      <Card style={{width: '18rem'}}>
          <Card.Body>
              <Card.Title>{todo.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{todo.description}</Card.Subtitle>
              <Card.Text>Status : {todo.status? <p>Done!</p> : <p> Not Done Bitch</p>}</Card.Text>
              <Button variant='primary' onClick={updateCompletionStatus}>
                {/* Has to be cached in future or stored in local storage, because 
                after refreshing the completionStatus goes back to being false!*/}
                { completionStatus? (<span> Mark as incomplete</span>) : (
                  <span>
                    Mark as completed
                  </span>
                )
                }
              </Button>
          </Card.Body>
      </Card>
  )
}

export default Todo;