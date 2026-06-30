package com.seapedia.backend.controllers;

import com.seapedia.backend.models.Address;
import com.seapedia.backend.models.User;
import com.seapedia.backend.payload.request.AddressRequest;
import com.seapedia.backend.repositories.AddressRepository;
import com.seapedia.backend.repositories.UserRepository;
import com.seapedia.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer/addresses")
public class AddressController {

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    UserRepository userRepository;

    private User getAuthenticatedBuyer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        boolean isBuyer = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_BUYER"));

        if (!isBuyer) {
            throw new RuntimeException("Error: Anda tidak memiliki akses sebagai Pembeli.");
        }

        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User tidak ditemukan."));
    }

    @GetMapping
    public ResponseEntity<?> getMyAddresses() {
        try {
            User buyer = getAuthenticatedBuyer();
            List<Address> addresses = addressRepository.findByBuyer(buyer);
            return ResponseEntity.ok(addresses);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addAddress(@RequestBody AddressRequest request) {
        try {
            User buyer = getAuthenticatedBuyer();

            Address address = new Address();
            address.setBuyer(buyer);
            address.setTitle(request.getTitle());
            address.setFullAddress(request.getFullAddress());
            address.setCity(request.getCity());
            address.setPostalCode(request.getPostalCode());

            addressRepository.save(address);

            return ResponseEntity.ok("Alamat '" + address.getTitle() + "' berhasil ditambahkan!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
