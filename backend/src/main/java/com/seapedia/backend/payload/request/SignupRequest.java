package com.seapedia.backend.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 30)
    @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Username hanya boleh huruf, angka, titik, underscore, dan strip")
    private String username;

    @NotBlank
    @Size(max = 100)
    @Email(message = "Format email tidak valid")
    private String email;

    private Set<String> roles;

    @NotBlank
    @Size(min = 8, max = 40)
    private String password;
}