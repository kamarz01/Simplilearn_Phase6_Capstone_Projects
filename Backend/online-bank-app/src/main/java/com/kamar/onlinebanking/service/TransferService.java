package com.kamar.onlinebanking.service;

import com.kamar.onlinebanking.dto.TransactionRequest;
import com.kamar.onlinebanking.entity.Account;
import com.kamar.onlinebanking.entity.Transactions;
import com.kamar.onlinebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Random;

@Service
public class TransferService {
    @Autowired
    private UserService userService;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountService accountService;

    public void CheckRecipientAccount(int accountId) {
        if(!accountService.isAccountExists(accountId))
            throw new RuntimeException("Recipient account does not exists.");
    }
    public void CheckBalance(int toAccountId, int amount) {
        accountService.isBalanceAllowTransfer(toAccountId,amount);
    }
    @Transactional
    public void TransferMoney(TransactionRequest request) {
        Account sourceAccount = accountService.getAccountById(request.getFromAccountId()).get();
        Account targetAccount = accountService.getAccountById(request.getToAccountId()).get();
        int amount = request.getAmount();
        sourceAccount.setAccountBalance(sourceAccount.getAccountBalance() - amount);
        targetAccount.setAccountBalance(targetAccount.getAccountBalance() + amount);
        accountService.updateAccount(sourceAccount);
        accountService.updateAccount(targetAccount);
        int transactionId = new Random().nextInt(666666666);
        Transactions transaction = new Transactions();
        transaction.setTransactionId(transactionId);
        transaction.setAccountId(sourceAccount.getAccountId());
        transaction.setAccountType(sourceAccount.getAccountName());
        transaction.setOperationType("Transfer");
        transaction.setUser(userService.getUserById(request.getUserId()).get());
        transaction.setDetails(String.format("Transfer $%s to Account: %s",amount,targetAccount.getAccountId()));
        transactionRepository.save(transaction);
    }

}
