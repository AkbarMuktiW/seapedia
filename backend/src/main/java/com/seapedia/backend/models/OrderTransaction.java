package com.seapedia.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "orders")
public class OrderTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = true)
    private User driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    private Address deliveryAddress;

    @Column(nullable = false)
    private String deliveryMethod;

    @Column(nullable = false)
    private Long subtotal;

    @Column(nullable = false)
    private Long deliveryFee;

    @Column(nullable = true)
    private String discountCode;

    @Column(nullable = false)
    private Long discountAmount = 0L;

    @Column(nullable = false)
    private Long taxAmount; // PPN 12%

    @Column(nullable = false)
    private Long totalAmount;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime orderDate;
}
