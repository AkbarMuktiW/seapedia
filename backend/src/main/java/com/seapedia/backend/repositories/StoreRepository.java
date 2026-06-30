package com.seapedia.backend.repositories;

import com.seapedia.backend.models.Store;
import com.seapedia.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Boolean existsByName(String name);
    Optional<Store> findByOwner(User owner);
}
