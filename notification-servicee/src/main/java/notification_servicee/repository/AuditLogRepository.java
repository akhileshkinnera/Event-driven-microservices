package notification_servicee.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import notification_servicee.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    boolean existsByEventId(String eventId);
}
