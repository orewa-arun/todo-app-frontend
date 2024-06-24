import axios, { AxiosResponse} from "axios"

// Get all tasks
export const getAllTodos =  async () : Promise<Todo[]> => {
    try {
        const response : AxiosResponse = await axios.get('http://localhost:4000/api/todos');
        const todos : Todo[] = response['data']['todos'];
        // console.log(todos);
        return todos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createNewTodo = async (obj : {name : string, description : string}) : Promise<Todo | undefined> => {
    try {
        const response : AxiosResponse = await axios.post('http://localhost:4000/api/add-todo', {
            name : obj.name,
            description : obj.description
        },
        {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        // console.log(response['data']['todo']);
        const newTodo : Todo = response['data']['todo'];
        return newTodo;
    } catch (err) {
        console.error(err);
    }
} 

export const updateTodo = async (id : string, obj : {name : string, description : string}, completionStatus : boolean) : Promise<Todo | undefined> => {
    try {
        const response : AxiosResponse = await axios.put(`http://localhost:4000/api/update-todo/${id}`, {
          name : obj.name,
          description : obj.description,
          status : completionStatus
        },{
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        const updatedTodo = response['data']['todo']
        return updatedTodo;
    } catch (err) {
        console.error(err);
    }
}

export const deleteTodoById = async (id : string) => {
    try {
        // const response : AxiosResponse = 
        await axios.delete(`http://localhost:4000/api/delete-todo/${id}`);
        // console.log(response);
    } catch (err) {
        console.error(err)
    }
}