package com.seapedia.backend.controllers;

import com.seapedia.backend.models.Store;
import com.seapedia.backend.models.User;
import com.seapedia.backend.payload.request.StoreRequest;
import com.seapedia.backend.repositories.StoreRepository;
import com.seapedia.backend.repositories.UserRepository;
import com.seapedia.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/seller/stores")
public class StoreController {

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createStore(@RequestBody StoreRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        boolean isSeller = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_SELLER"));
        
        if (!isSeller) {
            return ResponseEntity.status(403).body("Error: Anda tidak memiliki akses sebagai Seller.");
        }

        User owner = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User tidak ditemukan."));

        Optional<Store> existingStore = storeRepository.findByOwner(owner);
        if (existingStore.isPresent()) {
            return ResponseEntity.badRequest().body("Error: Anda sudah memiliki toko '" + existingStore.get().getName() + "'");
        }

        if (storeRepository.existsByName(request.getName())) {
            return ResponseEntity.badRequest().body("Error: Nama toko sudah digunakan. Silakan pilih nama lain.");
        }

        Store store = new Store();
        store.setName(request.getName());
        store.setOwner(owner);

        storeRepository.save(store);

        return ResponseEntity.ok("Toko '" + store.getName() + "' berhasil dibuat!");
    }

    @GetMapping("/my-store")
    public ResponseEntity<?> getMyStore() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User owner = userRepository.findById(userDetails.getId()).get();

        Optional<Store> store = storeRepository.findByOwner(owner);
        if (store.isEmpty()) {
            return ResponseEntity.status(404).body("Error: Anda belum membuat toko.");
        }
        return ResponseEntity.ok(store.get());
    }
}
