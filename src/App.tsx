import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// API
import { getAllTodos, addTodo, updateTodo, deleteTodo } from "./API";

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

  const createNewTodo = async(obj : {name : string, description : string}) => {
    const newTodo : Todo = (await addTodo({name : obj.name, description : obj.description})) as Todo;
    console.log("new todo created! : ", newTodo);
    setTodoList([
      ...todoList,
      newTodo
    ]);
  }

  const modifyTodo = async(todoId : string, obj : {name : string, description : string}, todoStatus : boolean) => {
    const updatedTodo : Todo = (await updateTodo(todoId, obj , todoStatus)) as Todo;
    console.log("todo edited! : ", updatedTodo);
    const newTodoList : Todo[] = todoList.filter(todo => todo._id !== todoId);
    setTodoList([
      ...newTodoList,
      updatedTodo
    ]);
  }

  const eraseTodo = async(todo : Todo) => {
    await deleteTodo(todo._id);
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
      <TodoModal createOrUpdateTodo={createNewTodo}/>
      <Row>
        { !loading ? (
            todoList.map((todo) => (
              <Col key={todo.name} className="mb-4">
                <Todo todo={todo} modifyTodo={modifyTodo} eraseTodo={eraseTodo}/>
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