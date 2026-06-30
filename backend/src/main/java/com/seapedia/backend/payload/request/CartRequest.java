package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class CartRequest {
    private Long productId;
    private Integer quantity;
}
