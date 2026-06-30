package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class AddressRequest {
    private String title;
    private String fullAddress;
    private String city;
    private String postalCode;
}
