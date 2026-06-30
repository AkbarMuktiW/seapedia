package com.seapedia.backend.controllers;

import com.seapedia.backend.repositories.*;
import com.seapedia.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    StoreRepository storeRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    OrderTransactionRepository orderTransactionRepository;
    @Autowired
    VoucherRepository voucherRepository;
    @Autowired
    PromoRepository promoRepository;

    private void verifyAdminAccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            throw new RuntimeException("Error: Anda tidak memiliki akses sebagai Admin.");
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getSystemSummary() {
        try {
            verifyAdminAccess(); 

            Map<String, Object> stats = new HashMap<>();
            
            stats.put("totalUsers", userRepository.count());
            stats.put("totalStores", storeRepository.count());
            stats.put("totalProducts", productRepository.count());
            stats.put("totalOrders", orderTransactionRepository.count());
            stats.put("totalVouchers", voucherRepository.count());
            stats.put("totalPromos", promoRepository.count());

            long pendingOrders = orderTransactionRepository.findAll().stream()
                    .filter(o -> o.getStatus().equals("Sedang Dikemas")).count();
            long shippingOrders = orderTransactionRepository.findAll().stream()
                    .filter(o -> o.getStatus().equals("Sedang Dikirim") || o.getStatus().equals("Menunggu Pengirim")).count();
            long completedOrders = orderTransactionRepository.findAll().stream()
                    .filter(o -> o.getStatus().equals("Pesanan Selesai")).count();
            long returnedOrders = orderTransactionRepository.findAll().stream()
                    .filter(o -> o.getStatus().equals("Dikembalikan")).count();

            Map<String, Long> orderStats = new HashMap<>();
            orderStats.put("sedangDikemas", pendingOrders);
            orderStats.put("sedangDikirim", shippingOrders);
            orderStats.put("selesai", completedOrders);
            orderStats.put("dikembalikan", returnedOrders);
            
            stats.put("orderStatistics", orderStats);

            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
