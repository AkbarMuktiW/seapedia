package com.seapedia.backend.payload.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TopUpRequest {
    @NotNull(message = "Nominal top-up tidak boleh kosong")
    @Min(value = 10000, message = "Minimal top-up adalah Rp10.000")
    private Long amount;
}
