package com.seapedia.backend.controllers;

import com.seapedia.backend.models.CartItem;
import com.seapedia.backend.models.Product;
import com.seapedia.backend.models.Store;
import com.seapedia.backend.models.User;
import com.seapedia.backend.payload.request.CartRequest;
import com.seapedia.backend.repositories.CartItemRepository;
import com.seapedia.backend.repositories.ProductRepository;
import com.seapedia.backend.repositories.UserRepository;
import com.seapedia.backend.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/buyer/cart")
public class CartController {
    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ProductRepository productRepository;

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
    public ResponseEntity<?> getCartSummary() {
        try {
            User buyer = getAuthenticatedBuyer();
            List<CartItem> cartItems = cartItemRepository.findByBuyer(buyer);

            Long subtotal = 0L;
            String storeName = null;

            for (CartItem item : cartItems) {
                subtotal += (item.getProduct().getPrice() * item.getQuantity());
            }

            if (!cartItems.isEmpty()) {
                storeName = cartItems.get(0).getProduct().getStore().getName();
            }

            Map<String, Object> response = new HashMap<>();
            response.put("items", cartItems);
            response.put("storeName", storeName);
            response.put("subtotal", subtotal);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartRequest request) {
        try {
            User buyer = getAuthenticatedBuyer();
            
            Product productToAdd = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Error: Produk tidak ditemukan."));

            if (productToAdd.getStock() < request.getQuantity()) {
                return ResponseEntity.badRequest().body("Error: Stok tidak mencukupi. Sisa stok: " + productToAdd.getStock());
            }

            List<CartItem> currentCart = cartItemRepository.findByBuyer(buyer);
            if (!currentCart.isEmpty()) {
                Store currentStore = currentCart.get(0).getProduct().getStore();
                Store newStore = productToAdd.getStore();
                if (!currentStore.getId().equals(newStore.getId())) {
                    return ResponseEntity.badRequest().body("Error: Keranjang Anda sudah berisi produk dari toko '" 
                            + currentStore.getName() + "'. Anda hanya bisa membeli dari satu toko pada satu waktu. " 
                            + "Silakan kosongkan keranjang terlebih dahulu.");
                }
            }

            Optional<CartItem> existingItem = cartItemRepository.findByBuyerAndProduct(buyer, productToAdd);
            
            if (existingItem.isPresent()) {
                CartItem item = existingItem.get();
                item.setQuantity(item.getQuantity() + request.getQuantity());
                cartItemRepository.save(item);
            } else {
                CartItem newItem = new CartItem();
                newItem.setBuyer(buyer);
                newItem.setProduct(productToAdd);
                newItem.setQuantity(request.getQuantity());
                cartItemRepository.save(newItem);
            }

            return ResponseEntity.ok("Produk berhasil ditambahkan ke keranjang!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        try {
            User buyer = getAuthenticatedBuyer();
            CartItem item = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new RuntimeException("Error: Barang tidak ada di keranjang."));

            if (!item.getBuyer().getId().equals(buyer.getId())) {
                return ResponseEntity.status(403).body("Error: Anda tidak berhak menghapus barang ini.");
            }

            cartItemRepository.delete(item);
            return ResponseEntity.ok("Barang berhasil dihapus dari keranjang.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/clear")
    @Transactional
    public ResponseEntity<?> clearCart() {
        try {
            User buyer = getAuthenticatedBuyer();
            cartItemRepository.deleteByBuyer(buyer);
            return ResponseEntity.ok("Keranjang berhasil dikosongkan.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
