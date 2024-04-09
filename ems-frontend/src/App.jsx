import './App.css'
import DepartmentComponent from './components/DepartmentComponent'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ListTodoComponent from './components/ListTodoComponent'
import TodoComponent from './components/TodoComponent'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/'
          
          element = {<ListEmployeeComponent />}></Route>
          <Route path='/employees' element = {<ListEmployeeComponent />}></Route>

          <Route path='/update-todo/:id' element = {<TodoComponent />}></Route>
          <Route path='/add-todo' element = {<TodoComponent />} ></Route>
          <Route path='/todos' element = {<ListTodoComponent />}></Route>
          <Route path='/add-employee' element = {<EmployeeComponent />}></Route>
          <Route path='/edit-employee/:id' element = {<EmployeeComponent />}></Route>
          <Route path='/departments' element = {<ListDepartmentComponent />}></Route>
          <Route path='/add-department' element = {<DepartmentComponent />}></Route>
          <Route path='/edit-department/:id' element = {<DepartmentComponent />}></Route>
        </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
