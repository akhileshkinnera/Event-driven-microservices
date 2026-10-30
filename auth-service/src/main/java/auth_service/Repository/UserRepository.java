package auth_service.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import auth_service.Entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}