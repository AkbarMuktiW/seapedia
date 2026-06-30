package com.seapedia.backend.repositories;

import com.seapedia.backend.models.OrderDetail;
import com.seapedia.backend.models.OrderTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrder(OrderTransaction order);
}
