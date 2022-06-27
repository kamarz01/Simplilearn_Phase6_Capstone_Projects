package com.kamar.onlinebanking.repository;

import com.kamar.onlinebanking.entity.ChequeRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChequeRequestsRepository extends JpaRepository<ChequeRequests,Integer> {
    public List<ChequeRequests> findBystatusEquals(String status);
}
