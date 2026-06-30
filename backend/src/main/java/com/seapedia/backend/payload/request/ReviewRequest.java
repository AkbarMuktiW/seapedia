package com.seapedia.backend.payload.request;

import lombok.Data;

@Data
public class ReviewRequest {
    private String reviewerName;
    private Integer rating;
    private String comment;
}
