package com.seapedia.backend.payload.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductRequest {
    @NotBlank(message = "Nama produk tidak boleh kosong")
    private String name;

    private String description;

    @NotNull(message = "Harga tidak boleh kosong")
    @Min(value = 1, message = "Harga minimal Rp1")
    private Long price;

    @NotNull(message = "Stok tidak boleh kosong")
    @Min(value = 0, message = "Stok tidak boleh negatif")
    private Integer stock;
}
