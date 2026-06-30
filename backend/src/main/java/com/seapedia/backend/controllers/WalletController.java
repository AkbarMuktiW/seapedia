package com.seapedia.backend.controllers;

import com.seapedia.backend.models.User;
import com.seapedia.backend.models.Wallet;
import com.seapedia.backend.models.WalletTransaction;
import com.seapedia.backend.payload.request.TopUpRequest;
import com.seapedia.backend.repositories.UserRepository;
import com.seapedia.backend.repositories.WalletRepository;
import com.seapedia.backend.repositories.WalletTransactionRepository;
import com.seapedia.backend.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buyer/wallet")
public class WalletController {
    @Autowired
    WalletRepository walletRepository;

    @Autowired
    WalletTransactionRepository walletTransactionRepository;

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

    private Wallet getOrCreateWallet(User buyer) {
        return walletRepository.findByOwner(buyer).orElseGet(() -> {
            Wallet newWallet = new Wallet();
            newWallet.setOwner(buyer);
            newWallet.setBalance(0L);
            return walletRepository.save(newWallet);
        });
    }

    @GetMapping
    public ResponseEntity<?> getWalletInfo() {
        try {
            User buyer = getAuthenticatedBuyer();
            Wallet wallet = getOrCreateWallet(buyer);
            List<WalletTransaction> history = walletTransactionRepository.findByWalletOrderByTransactionDateDesc(wallet);

            Map<String, Object> response = new HashMap<>();
            response.put("balance", wallet.getBalance());
            response.put("history", history);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping("/topup")
    public ResponseEntity<?> topUpWallet(@Valid @RequestBody TopUpRequest request) {
        try {
            if (request.getAmount() == null || request.getAmount() <= 0) {
                return ResponseEntity.badRequest().body("Error: Jumlah Top-Up harus lebih dari 0.");
            }

            User buyer = getAuthenticatedBuyer();
            Wallet wallet = getOrCreateWallet(buyer);

            wallet.setBalance(wallet.getBalance() + request.getAmount());
            walletRepository.save(wallet);

            WalletTransaction transaction = new WalletTransaction();
            transaction.setWallet(wallet);
            transaction.setAmount(request.getAmount());
            transaction.setType("TOP_UP");
            transaction.setDescription("Top-Up Saldo");
            transaction.setTransactionDate(LocalDateTime.now());
            
            walletTransactionRepository.save(transaction);

            return ResponseEntity.ok("Top-Up berhasil! Saldo Anda sekarang: Rp" + wallet.getBalance());
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
