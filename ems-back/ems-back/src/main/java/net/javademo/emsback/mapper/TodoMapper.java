package net.javademo.emsback.mapper;

import net.javademo.emsback.dto.TodoDto;
import net.javademo.emsback.entity.Todo;

public class TodoMapper {
    public static TodoDto mapToTodoDto(Todo todo){
        TodoDto todoDto = new TodoDto();
        todoDto.setId(todo.getId());
        todoDto.setTitle(todo.getTitle());
        todoDto.setDescription(todo.getDescription());
        todoDto.setCompleted(todo.isCompleted());

        if(todo.getEmployee() != null){
            todoDto.setEmployeeId(todo.getEmployee().getId());
        }

        return todoDto;
    }

    public static Todo mapToTodo(TodoDto todoDto){
        Todo todo = new Todo();
        todo.setId(todoDto.getId());
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        return todo;
    }
}
