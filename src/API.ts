import axios, {AxiosResponse} from "axios"

// Get all tasks
export const getAllTasks =  async () : Promise<Todo[]> => {
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
