package profile_service.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import profile_service.Entity.Profile;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
}
