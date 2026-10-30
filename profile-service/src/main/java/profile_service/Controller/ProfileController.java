package profile_service.Controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import profile_service.Entity.Profile;
import profile_service.Service.ProfileService;


@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(
            @RequestHeader("X-User-Id") Long userId, 
            @RequestBody Profile profileDetails) {
        
        Profile updatedProfile = profileService.updateProfile(userId, profileDetails);
        return ResponseEntity.ok(updatedProfile);
    }
}
