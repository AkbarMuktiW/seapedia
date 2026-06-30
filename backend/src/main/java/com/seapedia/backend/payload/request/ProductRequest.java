package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private Long price;
    private Integer stock;
}
