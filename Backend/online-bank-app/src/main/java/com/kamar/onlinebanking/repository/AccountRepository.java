package com.kamar.onlinebanking.repository;

import com.kamar.onlinebanking.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account,Integer> {
}
