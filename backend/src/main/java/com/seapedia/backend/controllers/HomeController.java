package com.seapedia.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String welcome() {
        return "Welcome to SEAPEDIA API - Level 1 is running";
    }

    @GetMapping("/api/rahasia")
    public String endpointRahasia() {
        return "Selamat! Anda memiliki token JWT yang valid dan berhasil masuk";
}
}
