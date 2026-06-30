package com.seapedia.backend.repositories;

import com.seapedia.backend.models.AppReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppReviewRepository extends JpaRepository<AppReview, Long> {
}
