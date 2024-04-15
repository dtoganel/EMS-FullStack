package net.javademo.emsback.controller;

import net.javademo.emsback.dto.TodoDto;
import net.javademo.emsback.entity.Todo;
import net.javademo.emsback.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
public class TodoController {
    private TodoService todoService;

    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){
        TodoDto saveTodo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(todoDto, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long id){
        TodoDto todoDto = todoService.getTodoById(id);

        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos(){
        List<TodoDto> todos = todoService.getAllTodos();

        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable("id") Long id,@RequestBody TodoDto todoDto){
        TodoDto updatedTodoDto = todoService.updateTodo(id, todoDto);

        return new ResponseEntity<>(updatedTodoDto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id){
        todoService.deleteTodo(id);

        return new ResponseEntity<>("Todo deleted successfully", HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long id){
        TodoDto updatedTodo = todoService.completeTodo(id);

        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("{id}/in-complete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long id){
        TodoDto updatedTodo = todoService.inCompleteTodo(id);

        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }
}
