package net.javademo.emsback.service.impl;

import lombok.AllArgsConstructor;
import net.javademo.emsback.dto.TodoDto;
import net.javademo.emsback.entity.Employee;
import net.javademo.emsback.entity.Todo;
import net.javademo.emsback.exception.ResourceNotFoundException;
import net.javademo.emsback.mapper.TodoMapper;
import net.javademo.emsback.repository.EmployeeRepository;
import net.javademo.emsback.repository.TodoRepository;
import net.javademo.emsback.service.TodoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private TodoRepository todoRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = TodoMapper.mapToTodo(todoDto);

        if(todoDto.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(todoDto.getEmployeeId()).orElseThrow(
                    () -> new ResourceNotFoundException("Employee " + todoDto.getEmployeeId() + " doesn't exists"));
            todo.setEmployee(employee);
        }

        Todo savedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(savedTodo);
    }

    @Override
    public TodoDto getTodoById(Long id){
        Todo todo = todoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Todo " + id + " not found"));

        return TodoMapper.mapToTodoDto(todo);
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();

        return todos.stream().map(todo -> TodoMapper.mapToTodoDto(todo)).collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto todoDto) {
        Todo todo = todoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Todo " + id + " not found"));

        todo.setTitle(todoDto.getTitle());
        todo.setCompleted(todoDto.isCompleted());
        todo.setDescription(todoDto.getDescription());

        if(todoDto.getEmployeeId() != null){
            Employee employee = employeeRepository.findById(todoDto.getEmployeeId()).orElseThrow(
                    () -> new ResourceNotFoundException("Employee " + todoDto.getEmployeeId() + " doesn't exists"));
            todo.setEmployee(employee);
        }

        if(todoDto.getEmployeeId() == null){
            todo.setEmployee(null);
        }

        Todo updatedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Todo " + id + " not found"));

        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Todo " + id + " not found"));

        todo.setCompleted(Boolean.TRUE);

        Todo savedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(savedTodo);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Todo " + id + " not found"));

        todo.setCompleted(Boolean.FALSE);

        Todo savedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(savedTodo);
    }
}
