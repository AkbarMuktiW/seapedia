package com.seapedia.backend.conifg;

import com.seapedia.backend.models.Role;
import com.seapedia.backend.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.count() == 0) {
                Role admin = new Role();
                admin.setName("ROLE_ADMIN");

                Role seller = new Role();
                seller.setName("ROLE_SELLER");

                Role buyer = new Role();
                buyer.setName("ROLE_BUYER");

                Role driver = new Role();
                driver.setName("ROLE_DRIVER");

                roleRepository.save(admin);
                roleRepository.save(seller);
                roleRepository.save(buyer);
                roleRepository.save(driver);

                System.out.println("Data Seeder: Berhasil menyuntikkan 4 Role dasar ke database");
            }
        };
    }
}
