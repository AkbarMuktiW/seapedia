package com.seapedia.backend.controllers;

import com.seapedia.backend.models.Promo;
import com.seapedia.backend.models.Voucher;
import com.seapedia.backend.payload.request.PromoRequest;
import com.seapedia.backend.payload.request.VoucherRequest;
import com.seapedia.backend.repositories.PromoRepository;
import com.seapedia.backend.repositories.UserRepository;
import com.seapedia.backend.repositories.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/admin/discounts")
public class AdminDiscountController {
    @Autowired
    VoucherRepository voucherRepository;
    @Autowired
    PromoRepository promoRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/vouchers")
    public ResponseEntity<?> createVoucher(@RequestBody VoucherRequest request) {
        if (voucherRepository.findByCode(request.getCode()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Kode voucher sudah ada.");
        }

        Voucher voucher = new Voucher();
        voucher.setCode(request.getCode().toUpperCase());
        voucher.setDiscountAmount(request.getDiscountAmount());
        voucher.setRemainingUsage(request.getRemainingUsage());
        voucher.setExpiryDate(LocalDateTime.now().plusDays(request.getValidDays()));
        
        voucherRepository.save(voucher);
        return ResponseEntity.ok("Voucher '" + voucher.getCode() + "' berhasil dibuat!");
    }

    @PostMapping("/promos")
    public ResponseEntity<?> createPromo(@RequestBody PromoRequest request) {
        if (promoRepository.findByCode(request.getCode()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Kode promo sudah ada.");
        }

        Promo promo = new Promo();
        promo.setCode(request.getCode().toUpperCase());
        promo.setDiscountPercentage(request.getDiscountPercentage());
        promo.setExpiryDate(LocalDateTime.now().plusDays(request.getValidDays()));
        
        promoRepository.save(promo);
        return ResponseEntity.ok("Promo '" + promo.getCode() + "' berhasil dibuat!");
    }
    
    @GetMapping("/vouchers")
    public ResponseEntity<?> getAllVouchers() {
        return ResponseEntity.ok(voucherRepository.findAll());
    }

    @GetMapping("/promos")
    public ResponseEntity<?> getAllPromos() {
        return ResponseEntity.ok(promoRepository.findAll());
    }

    @GetMapping("/vouchers/{id}")
    public ResponseEntity<?> getVoucherDetail(@PathVariable Long id) {
        return voucherRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/promos/{id}")
    public ResponseEntity<?> getPromoDetail(@PathVariable Long id) {
        return promoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }
}
