package com.seapedia.backend.controllers;

import com.seapedia.backend.models.Product;
import com.seapedia.backend.models.Store;
import com.seapedia.backend.models.User;
import com.seapedia.backend.payload.request.ProductRequest;
import com.seapedia.backend.repositories.ProductRepository;
import com.seapedia.backend.repositories.StoreRepository;
import com.seapedia.backend.repositories.UserRepository;
import com.seapedia.backend.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seller/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    UserRepository userRepository;

    private Store getAuthenticatedSellerStore() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User owner = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User tidak ditemukan."));

        return storeRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Error: Anda belum memiliki toko. Silakan buat toko terlebih dahulu."));
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequest request) {
        try {
            Store myStore = getAuthenticatedSellerStore();

            Product product = new Product();
            product.setName(request.getName());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setStock(request.getStock());
            product.setStore(myStore);

            productRepository.save(product);
            return ResponseEntity.ok("Produk '" + product.getName() + "' berhasil ditambahkan!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyProducts() {
        try {
            Store myStore = getAuthenticatedSellerStore();
            List<Product> myProducts = productRepository.findByStore(myStore);
            return ResponseEntity.ok(myProducts);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        try {
            Store myStore = getAuthenticatedSellerStore();

            // Cari produk berdasarkan ID
            Optional<Product> productData = productRepository.findById(id);
            if (productData.isEmpty()) {
                return ResponseEntity.status(404).body("Error: Produk tidak ditemukan.");
            }

            Product product = productData.get();

            if (!product.getStore().getId().equals(myStore.getId())) {
                return ResponseEntity.status(403).body("Error: Anda tidak berhak mengubah produk milik toko lain.");
            }

            // Update data
            product.setName(request.getName());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setStock(request.getStock());

            productRepository.save(product);
            return ResponseEntity.ok("Produk berhasil diperbarui!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            Store myStore = getAuthenticatedSellerStore();

            Optional<Product> productData = productRepository.findById(id);
            if (productData.isEmpty()) {
                return ResponseEntity.status(404).body("Error: Produk tidak ditemukan.");
            }

            Product product = productData.get();

            if (!product.getStore().getId().equals(myStore.getId())) {
                return ResponseEntity.status(403).body("Error: Anda tidak berhak menghapus produk milik toko lain.");
            }

            productRepository.delete(product);
            return ResponseEntity.ok("Produk berhasil dihapus!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
