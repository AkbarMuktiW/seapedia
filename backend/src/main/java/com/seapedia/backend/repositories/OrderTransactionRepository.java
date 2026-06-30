package com.seapedia.backend.repositories;

import com.seapedia.backend.models.OrderTransaction;
import com.seapedia.backend.models.Store;
import com.seapedia.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderTransactionRepository extends JpaRepository<OrderTransaction, Long> {
    List<OrderTransaction> findByBuyerOrderByOrderDateDesc(User buyer);
    List<OrderTransaction> findByStoreOrderByOrderDateDesc(Store store);
    List<OrderTransaction> findByStatusOrderByOrderDateAsc(String status);
    List<OrderTransaction> findByDriverOrderByOrderDateDesc(User driver);
}
