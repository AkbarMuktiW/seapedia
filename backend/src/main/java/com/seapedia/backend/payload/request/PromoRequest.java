package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class PromoRequest {
    private String code;
    private Integer discountPercentage;
    private Integer validDays;
}
