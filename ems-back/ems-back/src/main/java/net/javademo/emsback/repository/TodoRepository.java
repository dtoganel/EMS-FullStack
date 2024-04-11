package net.javademo.emsback.repository;

import net.javademo.emsback.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query(value = "SELECT t.* FROM todos t LEFT JOIN employees e ON t.employee_id = e.id WHERE e.id = :employeeId", nativeQuery = true)
    List<Todo> findTodosByEmployees(Long employeeId);
}
