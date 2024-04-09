import React, { useState, useEffect } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';
import { listEmployees } from '../services/EmployeeService';

function ListTodoComponent() {

    const [todos, setTodos] = useState([]);
    const navigator = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [department, setDepartments] = useState();

    useEffect(() => {
        getTodos();
        getEmployees();
        getDep();
    }, [])

    const getDep = () => {
        getAllDepartments().then((response) => {
            setDepartments(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

    const getEmpNameById = (id) => {
        const emp = employees?.find(empName => empName.id === id)
        console.log(emp)
        return emp
    }

    function getEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

    function getTodos(){
        getAllTodos().then((response) => {
            setTodos(response.data);
        }).catch(error => {
            console.error(error)
        })
    }

    function removeTodo(id){
        deleteTodo(id).then((response => {
            getTodos();
        })).catch(error => {
            console.log(error)
        })
    }

    function addNewTodo(){
        navigator('/add-todo');
    }

    function updateTodo(id){
        console.log(id);
        navigator(`/update-todo/${id}`)
    }

    function markComplete(id){
        completeTodo(id).then((response =>{
            getTodos();
        })).catch(error => {
            console.error(error)
        })
    }
    function markInComplete(id){
        inCompleteTodo(id).then((response => {
            getTodos();
        })).catch(error => {
            console.error(error)
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of tasks</h2>
        <button className='btn btn-primary mb-2'onClick={addNewTodo}>Create Task</button>
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Task Description</th>
                        <th>Task Status</th>
                        <th>Employee - Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => {
                            const employeeName = getEmpNameById(todo.employeeId)
                            console.log(employeeName)
                            return(<tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? "Completed" : "Not Completed"}</td>
                                <td>{employeeName ? `${employeeName.firstName} ${employeeName.lastName}` : ""}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{marginLeft: "10px"}}>Delete</button>
                                    <button className='btn btn-success' onClick={() => markComplete(todo.id)} style={{marginLeft: "10px"}}>Complete</button>
                                    <button className='btn btn-info' onClick={() => markInComplete(todo.id)} style={{marginLeft: "10px"}}>Not Complete</button>
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

export default ListTodoComponent