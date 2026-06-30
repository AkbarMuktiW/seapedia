package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class CheckoutRequest {
    private Long addressId;
    private String deliveryMethod; 
}
