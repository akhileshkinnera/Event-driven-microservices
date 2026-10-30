package profile_service.Entity;



import jakarta.persistence.*;

@Entity
@Table(name = "outbox_events")
public class OutboxEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String aggregateId;
    private String aggregateType; 
    private String type; 
    
    @Column(columnDefinition = "TEXT")
    private String payload; 
    
    private String status; 

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAggregateId() { return aggregateId; }
    public void setAggregateId(String aggregateId) { this.aggregateId = aggregateId; }
    public String getAggregateType() { return aggregateType; }
    public void setAggregateType(String aggregateType) { this.aggregateType = aggregateType; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}