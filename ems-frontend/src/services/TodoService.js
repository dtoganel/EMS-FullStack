import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/todos'

export const getAllTodos = () => axios.get(BASE_REST_API_URL);

export const createTodo = (todo) => axios.post(BASE_REST_API_URL, todo);

export const getTodo = (todoId) => axios.get(BASE_REST_API_URL + "/" + todoId);

export const updateTodo = (todoId, todo) => axios.put(BASE_REST_API_URL + "/" + todoId, todo);

export const deleteTodo = (todoId) => axios.delete(BASE_REST_API_URL + "/" + todoId);

export const completeTodo = (todoId) => axios.patch(BASE_REST_API_URL + "/" + todoId + "/complete")

export const inCompleteTodo = (todoId) => axios.patch(`${BASE_REST_API_URL}/${todoId}/in-complete`)