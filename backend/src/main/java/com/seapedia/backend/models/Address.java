package com.seapedia.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User buyer;

    @Column(nullable = false)
    private String title; 

    @Column(columnDefinition = "TEXT", nullable = false)
    private String fullAddress;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String postalCode;
}
