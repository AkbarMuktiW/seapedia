package com.seapedia.backend.payload.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartRequest {
    @NotNull(message = "Product ID wajib diisi")
    private Long productId;

    @NotNull(message = "Jumlah barang wajib diisi")
    @Min(value = 1, message = "Kuantitas minimal adalah 1")
    private Integer quantity;
}
