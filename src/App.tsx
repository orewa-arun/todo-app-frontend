import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// API
import { createNewTodo, getAllTodos } from "./API";

// components
import Todo from "./components/Todo";
import TodoModal from "./components/TodoModal";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadAllTodos(){
    setLoading(true);
    const allTodos : Todo[] = await getAllTodos(); 

    setTodoList(allTodos);
    setLoading(false);
  }

  const addTodo = (todo : Todo) => {
    setTodoList([
      ...todoList,
      todo
    ]);
  }

  const updateTodo = (todo : Todo) => {
    const newTodoList : Todo[] = todoList.filter(obj => obj._id !== todo._id);
    setTodoList(newTodoList);
    addTodo(todo);
  }

  const deleteTodo = (todo : Todo) => {
    const newTodoList : Todo[] = todoList.filter(obj => obj !== todo);
    setTodoList(newTodoList);
  }

  // To display when the app starts
  useEffect(() => {
    loadAllTodos();
  },[]);

  return (
    <Container>
      <h1 className="text-4xl text-blue-500" >TODO-APP</h1>
      {
        !loading && (
          <button className='show' onClick={loadAllTodos}>RELOAD TASKS</button>
        )
      }
      <TodoModal createOrUpdateTodo={createNewTodo} addOrUpdateTodo={addTodo}/>
      <Row>
        { !loading ? (
            todoList.map((todo) => (
              <Col key={todo.name} className="mb-4">
                <Todo todo={todo} modifyTodo={updateTodo} eraseTodo={deleteTodo}/>
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