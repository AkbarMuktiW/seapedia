package com.seapedia.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "vouchers")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private Long discountAmount;

    @Column(nullable = false)
    private Integer remainingUsage;

    @Column(nullable = false)
    private LocalDateTime expiryDate;
}
