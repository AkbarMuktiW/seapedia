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
import com.seapedia.backend.payload.request.LoginRequest;
import com.seapedia.backend.payload.response.JwtResponse;
import com.seapedia.backend.security.jwt.JwtUtils;
import com.seapedia.backend.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;
import java.util.stream.Collectors;
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
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
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