import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// API
import { getAllTasks } from "./API";

// components
import Todo from "./components/Todo";

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  async function displayTasks(){
    setLoading(true);
    const allTodos : Todo[] = await getAllTasks(); 

    setTodos(allTodos);
    setLoading(false);
  }

  return (
    <Container>
      <h1 className="text-4xl text-blue-500" >TODO-APP</h1>
      {
        !loading && (
          <button className='show' onClick={displayTasks}>RELOAD TASKS</button>
        )
      }
      <Row>
        { !loading ? (
            todos.map((todo) => (
              <Col key={todo.name} className="mb-4">
                <Todo todo={todo}/>
              </Col>
            ))
          ) : (
            <p>Loading...</p>
          )
        }
      </Row>
    </Container>

  )
}

export default App;