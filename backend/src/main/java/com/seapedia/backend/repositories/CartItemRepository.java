package com.seapedia.backend.repositories;

import com.seapedia.backend.models.CartItem;
import com.seapedia.backend.models.Product;
import com.seapedia.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByBuyer(User buyer);
    Optional<CartItem> findByBuyerAndProduct(User buyer, Product product);
    void deleteByBuyer(User buyer);
}
