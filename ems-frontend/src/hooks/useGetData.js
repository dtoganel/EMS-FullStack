import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useState } from 'react';
const useGetData = () => {
    const [departmentName, setDepartmentName] = useState()
    const [departmentDescription, setDepartmentDescription] = useState('')


    const retreveData = (id) => {
        getDepartmentById(id).then((response) => {
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription);
          }).catch(error => {
            console.error(error);
          })
    }

    return {departmentName, departmentDescription, retreveData, setDepartmentDescription, setDepartmentName}
}

export default useGetData;