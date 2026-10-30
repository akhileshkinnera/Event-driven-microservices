package profile_service.Service;




import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import profile_service.Config.RabbitConfig;
import profile_service.Entity.OutboxEvent;
import profile_service.Repository.OutboxEventRepository;

import java.util.List;

@Service
public class OutboxRelayScheduler {

    private final OutboxEventRepository repository;
    private final RabbitTemplate rabbitTemplate;

    public OutboxRelayScheduler(OutboxEventRepository repository, RabbitTemplate rabbitTemplate) {
        this.repository = repository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Scheduled(fixedDelay = 5000)
    public void processOutboxEvents() {
        List<OutboxEvent> pendingEvents = repository.findByStatus("PENDING");
        
        for (OutboxEvent event : pendingEvents) {
            try {
                rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE_NAME, "profile.updated", event.getPayload());
                
                event.setStatus("SENT");
                repository.save(event);
                System.out.println("Published event ID: " + event.getId());
            } catch (Exception e) {
                System.err.println("Failed to send event ID: " + event.getId() + " - " + e.getMessage());
            }
        }
    }
}
