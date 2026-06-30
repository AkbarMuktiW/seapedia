package com.seapedia.backend.controllers;

import com.seapedia.backend.models.Role;
import com.seapedia.backend.models.User;
import com.seapedia.backend.payload.request.SignupRequest;
import com.seapedia.backend.repositories.RoleRepository;
import com.seapedia.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username sudah digunakan!");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            // Default = buyer
            Role userRole = roleRepository.findByName("ROLE_BUYER")
                    .orElseThrow(() -> new RuntimeException("Error: Role tidak ditemukan."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin":
                        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                                .orElseThrow(() -> new RuntimeException("Error: Role tidak ditemukan."));
                        roles.add(adminRole);
                        break;
                    case "seller":
                        Role sellerRole = roleRepository.findByName("ROLE_SELLER")
                                .orElseThrow(() -> new RuntimeException("Error: Role tidak ditemukan."));
                        roles.add(sellerRole);
                        break;
                    case "driver":
                        Role driverRole = roleRepository.findByName("ROLE_DRIVER")
                                .orElseThrow(() -> new RuntimeException("Error: Role tidak ditemukan."));
                        roles.add(driverRole);
                        break;
                    default:
                        Role buyerRole = roleRepository.findByName("ROLE_BUYER")
                                .orElseThrow(() -> new RuntimeException("Error: Role tidak ditemukan."));
                        roles.add(buyerRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok("User berhasil didaftarkan");
    }
}