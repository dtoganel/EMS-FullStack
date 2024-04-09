package net.javademo.emsback.controller;

import net.javademo.emsback.dto.TodoDto;
import net.javademo.emsback.entity.Todo;
import net.javademo.emsback.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){
        TodoDto saveTodo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(todoDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long id){
        TodoDto todoDto = todoService.getTodoById(id);

        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos(){
        List<TodoDto> todos = todoService.getAllTodos();

        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable("id") Long id,@RequestBody TodoDto todoDto){
        TodoDto updatedTodoDto = todoService.updateTodo(id, todoDto);

        return new ResponseEntity<>(updatedTodoDto, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id){
        todoService.deleteTodo(id);

        return new ResponseEntity<>("Todo deleted successfully", HttpStatus.OK);
    }

    @PatchMapping("{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long id){
        TodoDto updatedTodo = todoService.completeTodo(id);

        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }

    @PatchMapping("{id}/in-complete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long id){
        TodoDto updatedTodo = todoService.inCompleteTodo(id);

        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }
}
