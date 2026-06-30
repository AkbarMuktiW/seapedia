package com.seapedia.backend.controllers;

package com.seapedia.backend.controllers;

import com.seapedia.backend.models.*;
import com.seapedia.backend.payload.request.OverdueRequest;
import com.seapedia.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    OrderTransactionRepository orderTransactionRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    WalletTransactionRepository walletTransactionRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    OrderStatusHistoryRepository orderStatusHistoryRepository;

    @PostMapping("/trigger-overdue")
    @Transactional
    public ResponseEntity<?> triggerOverdueCheck(@RequestBody OverdueRequest request) {
        try {
            int daysForward = (request.getSimulateDaysForward() != null) ? request.getSimulateDaysForward() : 0;
            LocalDateTime simulatedCurrentTime = LocalDateTime.now().plusDays(daysForward);

            List<OrderTransaction> allOrders = orderTransactionRepository.findAll();
            int refundedCount = 0;

            for (OrderTransaction order : allOrders) {
                if (order.getStatus().equals("Pesanan Selesai") || order.getStatus().equals("Dikembalikan")) {
                    continue;
                }

                int slaDays = 0;
                switch (order.getDeliveryMethod().toUpperCase()) {
                    case "INSTANT": slaDays = 1; break;
                    case "NEXT_DAY": slaDays = 2; break;
                    case "REGULAR": slaDays = 5; break;
                }

                LocalDateTime deadline = order.getOrderDate().plusDays(slaDays);
                if (simulatedCurrentTime.isAfter(deadline)) {
                    
                    Wallet buyerWallet = walletRepository.findByOwner(order.getBuyer())
                            .orElseThrow(() -> new RuntimeException("Dompet pembeli tidak ditemukan."));
                    
                    buyerWallet.setBalance(buyerWallet.getBalance() + order.getTotalAmount());
                    walletRepository.save(buyerWallet);

                    WalletTransaction refundTx = new WalletTransaction();
                    refundTx.setWallet(buyerWallet);
                    refundTx.setAmount(order.getTotalAmount());
                    refundTx.setType("REFUND");
                    refundTx.setDescription("Pengembalian dana (Sistem Otomatis) untuk pesanan #" + order.getId());
                    refundTx.setTransactionDate(simulatedCurrentTime);
                    walletTransactionRepository.save(refundTx);

                    List<OrderDetail> details = orderDetailRepository.findByOrder(order);
                    for (OrderDetail detail : details) {
                        Product p = detail.getProduct();
                        p.setStock(p.getStock() + detail.getQuantity());
                        productRepository.save(p);
                    }

                    order.setStatus("Dikembalikan");
                    orderTransactionRepository.save(order);

                    OrderStatusHistory history = new OrderStatusHistory();
                    history.setOrder(order);
                    history.setStatus("Dikembalikan");
                    history.setTimestamp(simulatedCurrentTime);
                    orderStatusHistoryRepository.save(history);

                    refundedCount++;
                }
            }

            return ResponseEntity.ok("Pengecekan Overdue selesai. Menggunakan simulasi waktu +" 
                    + daysForward + " hari. Jumlah pesanan yang dibatalkan & direfund: " + refundedCount);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
