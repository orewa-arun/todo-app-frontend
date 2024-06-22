import { useState } from "react";
import { getAllTasks } from "./API";

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
    <div>
      <h1 className="text-4xl text-blue-500" >TODO-APP</h1>
      {
        !loading && (
          <button className='show' onClick={displayTasks}>SHOW ALL TASKS</button>
        )
      }
    </div>
  )
}

export default App;