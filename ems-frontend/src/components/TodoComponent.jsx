import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTodo, getTodo, updateTodo, getAllTodos } from '../services/TodoService'
import { listEmployees } from '../services/EmployeeService'

const TodoComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [completed, setCompleted] = useState(false)
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        if(id){
            getTodo(id).then((response) => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
                setEmployeeId(response.data.employeeId)
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])

    function saveOrTodo(e){
        e.preventDefault()

        const todo = {title, description, completed, employeeId}
        console.log(todo);

        if(id){
            updateTodo(id,todo).then((response) => {
                console.log(response.data)
                navigator("/todos")
            }).catch(error => {
                console.error(error);
            })
        }else{
            createTodo(todo).then((response) => {
                console.log(response.data)
                navigator("/todos")
            }).catch(error => {
                console.error(error);
            })
        }
    }

  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>{id ? "Update Task" : "Create Task"}</h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Task Title</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Task Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Task Description</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Task Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Task Completed</label>
                            <select
                                className='form-control'
                                value={completed}
                                onChange={(e) => setCompleted(e.target.value)}
                            >
                                <option value="false">Not Completed</option>
                                <option value="true">Completed</option>
                            </select>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Employees to assign task:</label>
                            <select
                            className='form-control'
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            >
                                <option value="">Task not assigned</option>
                                {
                                    employees.map(employee => 
                                        <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>)
                                }
                            </select>
                        </div>

                        <button className='btn btn-success' onClick={saveOrTodo}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodoComponent