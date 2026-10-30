package profile_service.Service;




import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import profile_service.Entity.OutboxEvent;
import profile_service.Entity.Profile;
import profile_service.Repository.OutboxEventRepository;
import profile_service.Repository.ProfileRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final OutboxEventRepository outboxEventRepository;
    private final ObjectMapper objectMapper; 

    public ProfileService(ProfileRepository profileRepository, OutboxEventRepository outboxEventRepository, ObjectMapper objectMapper) {
        this.profileRepository = profileRepository;
        this.outboxEventRepository = outboxEventRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public Profile updateProfile(Long userId, Profile profileDetails) {
        Profile profile = profileRepository.findByUserId(userId).orElse(new Profile());
        profile.setUserId(userId);
        profile.setFirstName(profileDetails.getFirstName());
        profile.setLastName(profileDetails.getLastName());
        profile.setEmail(profileDetails.getEmail());
        profile.setPhone(profileDetails.getPhone());
        Profile savedProfile = profileRepository.save(profile);

        try {
            OutboxEvent event = new OutboxEvent();
            event.setAggregateId(savedProfile.getId().toString());
            event.setAggregateType("Profile");
            event.setType("PROFILE_UPDATED");
            event.setPayload(objectMapper.writeValueAsString(savedProfile));
            event.setStatus("PENDING");
            outboxEventRepository.save(event);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize profile for outbox event", e);
        }

        return savedProfile;
    }
}
