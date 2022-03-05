import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;


const requests = {
    get: (url: string, googleId: string) => axios.get(url + `/${googleId}`).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    patch: (url: string, taskId: string, body: {}) => axios.patch(url + `/${taskId}`, body).then(responseBody),
    delete: (url: string, id: string) => axios.delete(url + `/${id}`).then(responseBody),

}

const Tasks = {
    list: (googleId: string) => requests.get('task', googleId),
    createTask: (task: any) => requests.post('task', task),
    updateTask: (taskId: string, task: any) => requests.patch('task', taskId, task),
    deleteTask: (id: string) => requests.delete('task', id),
}

const agent = {
    Tasks
}

export default agent;