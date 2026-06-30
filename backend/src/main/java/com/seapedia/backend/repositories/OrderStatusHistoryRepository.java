package com.seapedia.backend.repositories;

import com.seapedia.backend.models.OrderStatusHistory;
import com.seapedia.backend.models.OrderTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderStatusHistoryRepository extends JpaRepository<OrderStatusHistory, Long> {
    List<OrderStatusHistory> findByOrderOrderByTimestampAsc(OrderTransaction order);
}
