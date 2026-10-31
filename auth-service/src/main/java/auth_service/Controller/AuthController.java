package auth_service.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import auth_service.Entity.User;
import auth_service.Repository.UserRepository;
import auth_service.Service.JwtService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        if (userRepository.findByUsername(request.get("username")).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(request.get("username"));
        user.setPasswordHash(passwordEncoder.encode(request.get("password")));
        
        // FIX: Assign a default role so it is not null in the database
        user.setRole("USER"); 
        
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

   @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        System.out.println("Login attempt for user: " + request.get("username"));
        try {
            Optional<User> userOpt = userRepository.findByUsername(request.get("username"));
            
            if (userOpt.isPresent()) {
                System.out.println("User found in DB.");
                User user = userOpt.get();
                
                if (passwordEncoder.matches(request.get("password"), user.getPasswordHash())) {
                    System.out.println("Password matched!");
                    String role = user.getRole() != null ? user.getRole() : "USER";
                    String token = jwtService.generateToken(user.getUsername(), role, user.getId());
                    System.out.println("JWT generated successfully.");
                    return ResponseEntity.ok(Map.of("token", token));
                } else {
                    System.out.println("Password did NOT match!");
                }
            } else {
                System.out.println("User NOT found in DB!");
            }
            
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            
        } catch (Exception e) {
            System.out.println("CRASH OCCURRED: " + e.getMessage());
            e.printStackTrace(); 
            return ResponseEntity.status(500).body(Map.of("error", "Server crash: " + e.getMessage()));
        }
    }
}