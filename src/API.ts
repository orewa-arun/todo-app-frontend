import axios, { AxiosResponse} from "axios"

// Get all tasks
export const getAllTodos =  async () : Promise<Todo[]> => {
    try {
        const response : AxiosResponse = await axios.get('http://localhost:4000/api/todos');
        const todos : Todo[] = response['data']['todos'];
        console.log(todos);
        return todos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createNewTodo = async (obj : {name : string, description : string}) => {
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
        console.log(response);
    } catch (err) {
        console.error(err);
    }
} 