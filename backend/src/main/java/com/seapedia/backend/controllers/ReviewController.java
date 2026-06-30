package com.seapedia.backend.controllers;

import com.seapedia.backend.models.AppReview;
import com.seapedia.backend.payload.request.ReviewRequest;
import com.seapedia.backend.repositories.AppReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    AppReviewRepository appReviewRepository;

    @PostMapping
    public ResponseEntity<?> submitReview(@RequestBody ReviewRequest request) {
        if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
            return ResponseEntity.badRequest().body("Error: Rating harus antara 1 sampai 5.");
        }

        AppReview review = new AppReview();
        review.setReviewerName(request.getReviewerName());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        appReviewRepository.save(review);

        return ResponseEntity.ok("Terima kasih, ulasan Anda berhasil disimpan!");
    }

    @GetMapping
    public ResponseEntity<List<AppReview>> getAllReviews() {
        List<AppReview> reviews = appReviewRepository.findAll();
        return ResponseEntity.ok(reviews);
    }
}
