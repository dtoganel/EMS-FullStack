package net.javademo.emsback.service;

import net.javademo.emsback.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    DepartmentDto createDepartment(DepartmentDto departmentDto);
    DepartmentDto getDepartmentById(Long departmentId);
    List<DepartmentDto> getAllDepartments();
    DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto);
    void deleteDepartment(Long departmentId);
}
