package com.kamar.onlinebanking.service;

import com.kamar.onlinebanking.entity.Account;
import com.kamar.onlinebanking.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Optional<Account> getAccountById(int accountId){
        return accountRepository.findById(accountId);
    }

    public void updateAccount(Account account){
        accountRepository.save(account);
    }

    public boolean isAccountExists(int accountId){
        return accountRepository.existsById(accountId);
    }

    public void isBalanceAllowTransfer(int accountId, int amount){
        Account account = accountRepository.findById(accountId).get();
        int currentBalance = account.getAccountBalance();
        int balanceAfterTransfer = currentBalance - amount;
        if(balanceAfterTransfer < 0)
            throw new RuntimeException("Your account balance does not allow this transfer.");
    }
}
