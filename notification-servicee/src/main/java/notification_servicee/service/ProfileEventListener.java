package notification_servicee.service;



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import notification_servicee.config.RabbitConfig;
import notification_servicee.entity.AuditLog;
import notification_servicee.repository.AuditLogRepository;

import java.time.LocalDateTime;

@Service
public class ProfileEventListener {

    private final AuditLogRepository auditLogRepository;
    private final ObjectMapper objectMapper;

    public ProfileEventListener(AuditLogRepository auditLogRepository, ObjectMapper objectMapper) {
        this.auditLogRepository = auditLogRepository;
        this.objectMapper = objectMapper;
    }

    @RabbitListener(queues = RabbitConfig.QUEUE_NAME)
    public void handleProfileUpdatedEvent(String payload) {
        try {
            JsonNode jsonNode = objectMapper.readTree(payload);
            String profileId = jsonNode.get("id").asText();
            String email = jsonNode.get("email").asText();
            
            // We will use a combination of "PROFILE_UPDATED" and the profile ID as our idempotency key
            String eventId = "PROFILE_UPDATED_" + profileId;

            // 1. Idempotency Check: Have we seen this event before?
            if (auditLogRepository.existsByEventId(eventId)) {
                System.out.println("Duplicate message ignored for event: " + eventId);
                return; // Silently acknowledge and discard duplicate
            }

            // 2. Simulate a failure to test the Dead Letter Queue
            if (email.contains("error")) {
                System.err.println("Simulated failure. Routing to DLQ...");
                throw new RuntimeException("Simulated error processing profile");
            }

            // 3. Process the event (Simulate sending an email notification)
            System.out.println("Successfully sent Welcome Email to: " + email);

            // 4. Save the Audit Log so we never process this exact event again
            AuditLog log = new AuditLog();
            log.setEventId(eventId);
            log.setAction("SENT_WELCOME_EMAIL");
            log.setTimestamp(LocalDateTime.now());
            auditLogRepository.save(log);

        } catch (Exception e) {
            // Throwing AmqpRejectAndDontRequeueException tells RabbitMQ to route it to the DLQ instead of requeuing
            throw new AmqpRejectAndDontRequeueException("Message processing failed", e);
        }
    }
}
