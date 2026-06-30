package com.seapedia.backend.controllers;

import com.seapedia.backend.models.Product;
import com.seapedia.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/catalog")
public class PublicCatalogController {
    @Autowired
    ProductRepository productRepository;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllPublicProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductDetail(@PathVariable Long id) {
        Optional<Product> productData = productRepository.findById(id);
        if (productData.isEmpty()) {
            return ResponseEntity.status(404).body("Error: Produk tidak ditemukan.");
        }
        return ResponseEntity.ok(productData.get());
    }
}
