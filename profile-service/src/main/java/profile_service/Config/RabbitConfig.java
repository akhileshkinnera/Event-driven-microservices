package profile_service.Config;



import org.springframework.amqp.core.DirectExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    
    public static final String EXCHANGE_NAME = "profile.exchange";

    @Bean
    public DirectExchange profileExchange() {
        return new DirectExchange(EXCHANGE_NAME);
    }
}
