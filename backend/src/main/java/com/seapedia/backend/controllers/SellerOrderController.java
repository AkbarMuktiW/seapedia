package com.seapedia.backend.controllers;

import com.seapedia.backend.models.*;
import com.seapedia.backend.repositories.*;
import com.seapedia.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller/orders")
public class SellerOrderController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    StoreRepository storeRepository;
    @Autowired
    OrderTransactionRepository orderTransactionRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    OrderStatusHistoryRepository orderStatusHistoryRepository;

    private Store getAuthenticatedSellerStore() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        boolean isSeller = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_SELLER"));
        if (!isSeller) {
            throw new RuntimeException("Error: Anda tidak memiliki akses sebagai Penjual.");
        }

        User owner = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User tidak ditemukan."));
        return storeRepository.findByOwner(owner)
                .orElseThrow(() -> new RuntimeException("Error: Anda belum memiliki toko."));
    }

    @GetMapping
    public ResponseEntity<?> getIncomingOrders() {
        try {
            Store myStore = getAuthenticatedSellerStore();
            List<OrderTransaction> incomingOrders = orderTransactionRepository.findByStoreOrderByOrderDateDesc(myStore);
            return ResponseEntity.ok(incomingOrders);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIncomingOrderDetail(@PathVariable Long id) {
        try {
            Store myStore = getAuthenticatedSellerStore();

            OrderTransaction order = orderTransactionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Pesanan tidak ditemukan."));
            if (!order.getStore().getId().equals(myStore.getId())) {
                return ResponseEntity.status(403).body("Error: Ini bukan pesanan untuk toko Anda.");
            }

            List<OrderDetail> items = orderDetailRepository.findByOrder(order);
            List<OrderStatusHistory> history = orderStatusHistoryRepository.findByOrderOrderByTimestampAsc(order);

            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("orderSummary", order);
            response.put("items", items);
            response.put("statusHistory", history);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
