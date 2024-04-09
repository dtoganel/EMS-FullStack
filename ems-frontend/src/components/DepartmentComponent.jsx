import React, { useEffect, useState } from 'react'
import useGetData from '../hooks/useGetData';
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {
  const {departmentName, departmentDescription, retreveData, setDepartmentDescription, setDepartmentName} = useGetData()
    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() => {
      if(id){
        retreveData(id);
      }
    }, [id])

    function saveOrUpdateDepartment(e){
      e.preventDefault();

      const department = { departmentName, departmentDescription }

      console.log(department); 

      if(id){
        updateDepartment(id, department).then((response) => {
          console.log(response.data);
          navigator('/departments');
        }).catch(error => {
          console.error(error);
        })
      }else {
        createDepartment(department).then((response) => {
          console.log(response.data);
          navigator('/departments')
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
          
        <h2 className='text-center'>{id ? "Update Department": "Add Department"}</h2>

          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Department name:</label>
                <input
                  type='text'
                  name='departmentName'
                  placeholder='Enter Department Name'
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className='form-control'
                  >
                </input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Department description:</label>
                <input
                  type='text'
                  name='departmentDescription'
                  placeholder='Enter Department Description'
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className='form-control'
                  >
                </input>
              </div>

              <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentComponent