package com.seapedia.backend.repositories;

import com.seapedia.backend.models.Address;
import com.seapedia.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByBuyer(User buyer);
}
