import React, { useEffect, useState } from 'react'
import { getTodosByEmployee } from '../services/TodoService'
import { useNavigate, useParams } from 'react-router-dom'
import { completeTodo, inCompleteTodo, deleteTodo } from '../services/TodoService'
import { getEmployee } from '../services/EmployeeService'

function EmployeeTasksComponent() {

    const [completed, setCompleted] = useState(false)
    const [todos, setTodos] = useState([])
    const [employee, setEmployee] = useState()
    const {id} = useParams()
    const navigator = useNavigate()


    useEffect(() =>{
        getEmp(id)
        getAllTodosFromEmployee(id)
    }, [completed])

    function getEmp(id){
        getEmployee(id).then((response) => {
            console.log(response.data)
            setEmployee(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

    function getAllTodosFromEmployee(id){
        getTodosByEmployee(id).then((response) => {
            console.log(response.data)
            setTodos(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

    function markComplete(id){
        completeTodo(id).then(() => {
            console.log("Marked complete success")
            setCompleted(prevState => !prevState)
        }).catch(error => {
            console.error(error)
        })
    }
    function markInComplete(id){
        inCompleteTodo(id).then(() => {
            console.log("Marked inComplete success")
            setCompleted(prevState => !prevState)
        }).catch(error => {
            console.error(error)
        })
    }

    function removeTodo(id){
        deleteTodo(id).then((response => {
            getEmp(id)
        })).catch(error => {
            console.log(error)
        })
    }

    function updateTodo(id){
        navigator(`/update-todo/${id}`)
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of tasks assigned to {employee?.firstName} {employee?.lastName}</h2>
            {/* <button className='btn btn-primary mb-2' onClick={() =>addNewTodo}>Create Task</button> */}
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Task Description</th>
                            <th>Task Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(todo => {
                            return(<tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? "Completed" : "Not Completed"}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{marginLeft: "10px"}}>Delete</button>
                                    {todo.completed ? <button className='btn btn-info' onClick={() => markInComplete(todo.id)} style={{marginLeft: "10px"}}>Not Complete</button> : <button className='btn btn-success' onClick={() => markComplete(todo.id)} style={{marginLeft: "10px"}}>Complete</button> }
                                </td>
                            </tr>)}
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
      )
}

export default EmployeeTasksComponent