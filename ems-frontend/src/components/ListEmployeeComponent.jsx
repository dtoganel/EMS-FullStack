import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService'

const ListEmployeeComponent = () => {

   const [employees, setEmployees] = useState([])
   const [departments, setDepartments] = useState([])
   const navigator = useNavigate();
   const location = useLocation();

   const getNameById = (id) => {
    const dep = departments?.find(depName => depName.id === id)
    return dep && dep.departmentName;
   }

   useEffect(() => {
        getAllEmployees();
        getDepartments();
   }, [])
   

   function getDepartments(){
    getAllDepartments().then((response) => {
        setDepartments(response.data);
    }).catch(error => {
        console.error(error);
    })
   }

   function getAllEmployees(){
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.error(error);
    }) 
   }

   function addNewEmployee() {
    navigator('/add-employee');
   }

   function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
   }

   function removeEmployee(id) {
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
   }

  return (
    <div className='container'>
        <h2 className='text-center'>List of employees</h2>
        <button className='btn btn-primary mb-2'onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee first name</th>
                    <th>Employee last name</th>
                    <th>Employee email</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map((employee) => {
                        const departmentName = getNameById(employee.departmentId)
                        return(<tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{departmentName}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>)})
                }
            </tbody>
        </table>
    </div>
    )
}

export default ListEmployeeComponent