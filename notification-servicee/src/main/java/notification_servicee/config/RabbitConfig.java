package notification_servicee.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String EXCHANGE_NAME = "profile.exchange";
    public static final String QUEUE_NAME = "profile.queue";
    public static final String ROUTING_KEY = "profile.updated";

    public static final String DLQ_NAME = "profile.dlq";
    public static final String DLQ_ROUTING_KEY = "profile.dlq.routing";

    @Bean
    public DirectExchange profileExchange() {
        return new DirectExchange(EXCHANGE_NAME);
    }

    // Dead Letter Queue
    @Bean
    public Queue deadLetterQueue() {
        return QueueBuilder.durable(DLQ_NAME).build();
    }

    // Main Queue configured to send failures to the DLQ
    @Bean
    public Queue profileQueue() {
        return QueueBuilder.durable(QUEUE_NAME)
                .withArgument("x-dead-letter-exchange", EXCHANGE_NAME)
                .withArgument("x-dead-letter-routing-key", DLQ_ROUTING_KEY)
                .build();
    }

    @Bean
    public Binding profileBinding(Queue profileQueue, DirectExchange profileExchange) {
        return BindingBuilder.bind(profileQueue).to(profileExchange).with(ROUTING_KEY);
    }

    @Bean
    public Binding dlqBinding(Queue deadLetterQueue, DirectExchange profileExchange) {
        return BindingBuilder.bind(deadLetterQueue).to(profileExchange).with(DLQ_ROUTING_KEY);
    }
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
