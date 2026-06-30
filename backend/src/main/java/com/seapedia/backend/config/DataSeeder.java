package com.seapedia.backend.config;

import com.seapedia.backend.models.Role;
import com.seapedia.backend.models.User;
import com.seapedia.backend.repositories.RoleRepository;
import com.seapedia.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            // 1. INIT ROLES (Kode asli Anda)
            if (roleRepository.count() == 0) {
                Role admin = new Role(); admin.setName("ROLE_ADMIN");
                Role seller = new Role(); seller.setName("ROLE_SELLER");
                Role buyer = new Role(); buyer.setName("ROLE_BUYER");
                Role driver = new Role(); driver.setName("ROLE_DRIVER");

                roleRepository.save(admin);
                roleRepository.save(seller);
                roleRepository.save(buyer);
                roleRepository.save(driver);

                System.out.println("Data Seeder: Berhasil menyuntikkan 4 Role dasar ke database");
            }

            // 2. INIT DEMO USERS (Tambahan untuk Level 7)
            createDemoUser("admin", "admin@seapedia.com", "password123", "ROLE_ADMIN", roleRepository, userRepository, encoder);
            createDemoUser("buyer1", "buyer@seapedia.com", "password123", "ROLE_BUYER", roleRepository, userRepository, encoder);
            createDemoUser("seller1", "seller@seapedia.com", "password123", "ROLE_SELLER", roleRepository, userRepository, encoder);
            createDemoUser("driver1", "driver@seapedia.com", "password123", "ROLE_DRIVER", roleRepository, userRepository, encoder);
        };
    }

    // Fungsi Helper agar kode tidak terlalu panjang di atas
    private void createDemoUser(String username, String email, String password, String roleName, 
                                RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder encoder) {
        if (!userRepository.existsByUsername(username)) {
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(encoder.encode(password));
            Set<Role> roles = new HashSet<>();
            
            // Cari role dari database
            Role userRole = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Error: Role " + roleName + " tidak ditemukan."));
            
            roles.add(userRole);
            user.setRoles(roles);
            userRepository.save(user);
            
            System.out.println("Data Seeder: Berhasil membuat akun demo -> " + username);
        }
    }
}