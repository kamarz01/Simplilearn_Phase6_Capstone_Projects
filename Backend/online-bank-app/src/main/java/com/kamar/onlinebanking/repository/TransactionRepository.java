package com.kamar.onlinebanking.repository;

import com.kamar.onlinebanking.entity.ChequeRequests;
import com.kamar.onlinebanking.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions,Integer> {
    public List<Transactions> findBydepositWithdrawStatusEquals(String status);

}
