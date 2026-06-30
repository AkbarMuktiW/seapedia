package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class OverdueRequest {
    private Integer simulateDaysForward; 
}
