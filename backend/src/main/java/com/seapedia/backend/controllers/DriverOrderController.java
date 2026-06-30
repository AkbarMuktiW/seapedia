package com.seapedia.backend.controllers;

import com.seapedia.backend.models.*;
import com.seapedia.backend.repositories.*;
import com.seapedia.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/driver/jobs")
public class DriverOrderController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderTransactionRepository orderTransactionRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    OrderStatusHistoryRepository orderStatusHistoryRepository;

    private User getAuthenticatedDriver() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        boolean isDriver = userDetails.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_DRIVER"));

        if (!isDriver) {
            throw new RuntimeException("Error: Anda tidak memiliki akses sebagai Kurir/Driver.");
        }

        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User tidak ditemukan."));
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableJobs() {
        try {
            getAuthenticatedDriver();
            List<OrderTransaction> availableJobs = orderTransactionRepository.findByStatusOrderByOrderDateAsc("Menunggu Pengirim");
            return ResponseEntity.ok(availableJobs);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobDetail(@PathVariable Long id) {
        try {
            getAuthenticatedDriver();
            OrderTransaction order = orderTransactionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Pekerjaan tidak ditemukan."));

            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("orderSummary", order);
            response.put("items", orderDetailRepository.findByOrder(order)); 

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/take")
    @Transactional
    public ResponseEntity<?> takeJob(@PathVariable Long id) {
        try {
            User driver = getAuthenticatedDriver();
            OrderTransaction order = orderTransactionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Pekerjaan tidak ditemukan."));
            if (order.getDriver() != null || !order.getStatus().equals("Menunggu Pengirim")) {
                return ResponseEntity.badRequest().body("Error: Pekerjaan ini sudah diambil driver lain atau tidak tersedia.");
            }

            order.setDriver(driver);
            order.setStatus("Sedang Dikirim");
            orderTransactionRepository.save(order);

            OrderStatusHistory history = new OrderStatusHistory();
            history.setOrder(order);
            history.setStatus("Sedang Dikirim");
            history.setTimestamp(LocalDateTime.now());
            orderStatusHistoryRepository.save(history);

            return ResponseEntity.ok("Pekerjaan berhasil diambil! Status sekarang: Sedang Dikirim.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/complete")
    @Transactional
    public ResponseEntity<?> completeJob(@PathVariable Long id) {
        try {
            User driver = getAuthenticatedDriver();
            OrderTransaction order = orderTransactionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Pekerjaan tidak ditemukan."));

            if (!order.getDriver().getId().equals(driver.getId())) {
                return ResponseEntity.status(403).body("Error: Ini bukan pekerjaan Anda.");
            }

            if (!order.getStatus().equals("Sedang Dikirim")) {
                return ResponseEntity.badRequest().body("Error: Pesanan belum dalam status pengiriman.");
            }

            order.setStatus("Pesanan Selesai");
            orderTransactionRepository.save(order);

            OrderStatusHistory history = new OrderStatusHistory();
            history.setOrder(order);
            history.setStatus("Pesanan Selesai");
            history.setTimestamp(LocalDateTime.now());
            orderStatusHistoryRepository.save(history);

            return ResponseEntity.ok("Kerja bagus! Pesanan Selesai.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDriverDashboard() {
        try {
            User driver = getAuthenticatedDriver();
            List<OrderTransaction> myJobs = orderTransactionRepository.findByDriverOrderByOrderDateDesc(driver);

            long totalEarnings = 0L;
            int completedJobs = 0;
            OrderTransaction activeJob = null;

            for (OrderTransaction job : myJobs) {
                if (job.getStatus().equals("Pesanan Selesai")) {
                    completedJobs++;
                    totalEarnings += job.getDeliveryFee();
                } else if (job.getStatus().equals("Sedang Dikirim")) {
                    activeJob = job;
                }
            }

            java.util.Map<String, Object> report = new java.util.HashMap<>();
            report.put("driverName", driver.getUsername());
            report.put("activeJob", activeJob);
            report.put("completedJobs", completedJobs);
            report.put("totalEarnings", totalEarnings);
            report.put("jobHistory", myJobs);

            return ResponseEntity.ok(report);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
