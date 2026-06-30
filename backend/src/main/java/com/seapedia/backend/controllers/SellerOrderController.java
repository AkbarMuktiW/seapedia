package com.seapedia.backend.controllers;

import com.seapedia.backend.models.*;
import com.seapedia.backend.repositories.*;
import com.seapedia.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

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

    @PutMapping("/{id}/process")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<?> processOrder(@PathVariable Long id) {
        try {
            Store myStore = getAuthenticatedSellerStore();
            OrderTransaction order = orderTransactionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Pesanan tidak ditemukan."));

            if (!order.getStore().getId().equals(myStore.getId())) {
                return ResponseEntity.status(403).body("Error: Anda tidak berhak memproses pesanan toko lain.");
            }

            if (!order.getStatus().equals("Sedang Dikemas")) {
                return ResponseEntity.badRequest().body("Error: Pesanan tidak bisa diproses. Status saat ini: " + order.getStatus());
            }
            order.setStatus("Menunggu Pengirim");
            orderTransactionRepository.save(order);
            OrderStatusHistory history = new OrderStatusHistory();
            history.setOrder(order);
            history.setStatus("Menunggu Pengirim");
            history.setTimestamp(java.time.LocalDateTime.now());
            orderStatusHistoryRepository.save(history);

            return ResponseEntity.ok("Pesanan berhasil diproses! Status saat ini: Menunggu Pengirim.");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getIncomeSummary() {
        try {
            Store myStore = getAuthenticatedSellerStore();
            List<OrderTransaction> orders = orderTransactionRepository.findByStoreOrderByOrderDateDesc(myStore);

            long grossRevenue = 0L;
            int totalOrders = orders.size();
            int pendingOrders = 0;
            int processedOrders = 0;

            for (OrderTransaction order : orders) {
                if (!order.getStatus().equals("Dikembalikan")) {
                    long discount = (order.getDiscountAmount() != null) ? order.getDiscountAmount() : 0L;
                    grossRevenue += (order.getSubtotal() - discount);
                }

                if (order.getStatus().equals("Sedang Dikemas")) {
                    pendingOrders++;
                } else {
                    processedOrders++;
                }
            }

            java.util.Map<String, Object> report = new java.util.HashMap<>();
            report.put("storeName", myStore.getName());
            report.put("totalOrders", totalOrders);
            report.put("pendingOrders", pendingOrders);
            report.put("processedOrders", processedOrders);
            report.put("grossRevenue", grossRevenue); // Total pendapatan bersih penjual

            return ResponseEntity.ok(report);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
