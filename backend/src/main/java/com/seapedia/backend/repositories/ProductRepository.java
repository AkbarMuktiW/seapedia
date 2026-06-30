package com.seapedia.backend.repositories;

import com.seapedia.backend.models.Product;
import com.seapedia.backend.models.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStore(Store store);
}
