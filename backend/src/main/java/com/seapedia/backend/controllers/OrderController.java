package com.seapedia.backend.controllers;

import com.seapedia.backend.models.*;
import com.seapedia.backend.payload.request.CheckoutRequest;
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
@RequestMapping("/api/buyer/orders")
public class OrderController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CartItemRepository cartItemRepository;
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    WalletTransactionRepository walletTransactionRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    OrderTransactionRepository orderTransactionRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    OrderStatusHistoryRepository orderStatusHistoryRepository;

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

    @PostMapping("/checkout")
    @Transactional
    public ResponseEntity<?> processCheckout(@RequestBody CheckoutRequest request) {
        try {
            User buyer = getAuthenticatedBuyer();
            List<CartItem> cartItems = cartItemRepository.findByBuyer(buyer);
            if (cartItems.isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Keranjang belanja Anda kosong.");
            }

            Store store = cartItems.get(0).getProduct().getStore();

            Address deliveryAddress = addressRepository.findById(request.getAddressId())
                    .orElseThrow(() -> new RuntimeException("Error: Alamat tidak ditemukan."));
            if (!deliveryAddress.getBuyer().getId().equals(buyer.getId())) {
                return ResponseEntity.status(403).body("Error: Anda tidak berhak menggunakan alamat ini.");
            }

            Long subtotal = 0L;
            for (CartItem item : cartItems) {
                Product product = item.getProduct();
                if (product.getStock() < item.getQuantity()) {
                    throw new RuntimeException("Error: Stok untuk '" + product.getName() + "' tidak mencukupi. Sisa stok: " + product.getStock());
                }
                subtotal += (product.getPrice() * item.getQuantity());
            }

            Long deliveryFee = 0L;
            switch (request.getDeliveryMethod().toUpperCase()) {
                case "INSTANT": deliveryFee = 40000L; break;
                case "NEXT_DAY": deliveryFee = 25000L; break;
                case "REGULAR": deliveryFee = 15000L; break;
                default: throw new RuntimeException("Error: Metode pengiriman tidak valid.");
            }

            Long taxAmount = (subtotal * 12) / 100;
            Long totalAmount = subtotal + deliveryFee + taxAmount;
            Wallet wallet = walletRepository.findByOwner(buyer)
                    .orElseThrow(() -> new RuntimeException("Error: Dompet tidak ditemukan."));
            
            if (wallet.getBalance() < totalAmount) {
                throw new RuntimeException("Error: Saldo tidak mencukupi. Total tagihan: Rp" + totalAmount + ", Saldo Anda: Rp" + wallet.getBalance());
            }

            wallet.setBalance(wallet.getBalance() - totalAmount);
            walletRepository.save(wallet);

            WalletTransaction paymentTx = new WalletTransaction();
            paymentTx.setWallet(wallet);
            paymentTx.setAmount(totalAmount);
            paymentTx.setType("PAYMENT");
            paymentTx.setDescription("Pembayaran pesanan di toko " + store.getName());
            paymentTx.setTransactionDate(LocalDateTime.now());
            walletTransactionRepository.save(paymentTx);

            OrderTransaction order = new OrderTransaction();
            order.setBuyer(buyer);
            order.setStore(store);
            order.setDeliveryAddress(deliveryAddress);
            order.setDeliveryMethod(request.getDeliveryMethod().toUpperCase());
            order.setSubtotal(subtotal);
            order.setDeliveryFee(deliveryFee);
            order.setTaxAmount(taxAmount);
            order.setTotalAmount(totalAmount);
            order.setStatus("Sedang Dikemas");
            order.setOrderDate(LocalDateTime.now());
            orderTransactionRepository.save(order);

            for (CartItem item : cartItems) {
                Product product = item.getProduct();
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);

                OrderDetail detail = new OrderDetail();
                detail.setOrder(order);
                detail.setProduct(product);
                detail.setQuantity(item.getQuantity());
                detail.setPriceAtCheckout(product.getPrice());
                orderDetailRepository.save(detail);
            }

            OrderStatusHistory history = new OrderStatusHistory();
            history.setOrder(order);
            history.setStatus("Sedang Dikemas");
            history.setTimestamp(LocalDateTime.now());
            orderStatusHistoryRepository.save(history);
            cartItemRepository.deleteByBuyer(buyer);
            return ResponseEntity.ok("Checkout berhasil! Pesanan Anda sedang diproses oleh penjual.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyOrders() {
        try {
            User buyer = getAuthenticatedBuyer();
            List<OrderTransaction> orders = orderTransactionRepository.findByBuyerOrderByOrderDateDesc(buyer);
            return ResponseEntity.ok(orders);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long id) {
        try {
            User buyer = getAuthenticatedBuyer();
            
            OrderTransaction order = orderTransactionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Pesanan tidak ditemukan."));
            if (!order.getBuyer().getId().equals(buyer.getId())) {
                return ResponseEntity.status(403).body("Error: Anda tidak berhak melihat pesanan ini.");
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
