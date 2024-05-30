package net.javademo.emsback.repository;

import net.javademo.emsback.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
