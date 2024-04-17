package net.javademo.emsback.service;

import net.javademo.emsback.dto.TodoDto;
import net.javademo.emsback.entity.Todo;

import java.util.List;

public interface TodoService {
    TodoDto addTodo(TodoDto todoDto);
    TodoDto getTodoById(Long id);
    List<TodoDto> getAllTodos();

    TodoDto updateTodo(Long id, TodoDto todoDto);
    void deleteTodo(Long id);
    TodoDto completeTodo(Long id);
    TodoDto inCompleteTodo(Long id);
    List<TodoDto> findTodosByEmployee(Long id);
}
