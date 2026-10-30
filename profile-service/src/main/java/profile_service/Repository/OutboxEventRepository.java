package profile_service.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import profile_service.Entity.OutboxEvent;

import java.util.List;

public interface OutboxEventRepository extends JpaRepository<OutboxEvent, Long> {
    List<OutboxEvent> findByStatus(String status);
}