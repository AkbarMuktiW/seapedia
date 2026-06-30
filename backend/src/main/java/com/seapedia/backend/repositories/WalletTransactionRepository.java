package com.seapedia.backend.repositories;

import com.seapedia.backend.models.Wallet;
import com.seapedia.backend.models.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByWalletOrderByTransactionDateDesc(Wallet wallet);
}
