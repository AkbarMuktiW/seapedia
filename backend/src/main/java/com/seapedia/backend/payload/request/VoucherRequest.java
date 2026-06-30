package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class VoucherRequest {
    private String code;
    private Long discountAmount;
    private Integer remainingUsage;
    private Integer validDays;
}
