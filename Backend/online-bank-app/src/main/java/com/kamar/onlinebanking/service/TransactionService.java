package com.kamar.onlinebanking.service;

import com.kamar.onlinebanking.dto.TransactionRequest;
import com.kamar.onlinebanking.entity.Account;
import com.kamar.onlinebanking.entity.ChequeRequests;
import com.kamar.onlinebanking.entity.Transactions;
import com.kamar.onlinebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    @Autowired
    private UserService userService;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountService accountService;

    public void createTransaction(TransactionRequest request) {
        List<Transactions> list = transactionRepository
                .findBydepositWithdrawStatusEquals("Pending")
                .stream().filter(c -> c.getUser().getUserId() == request.getUserId())
                .collect(Collectors.toList());
        if(list.size() > 0)
            throw new RuntimeException("You still have pending withdraw/deposit operations.");
        Account sourceAccount = accountService.getAccountById(request.getAccountId()).get();
        int transactionId = new Random().nextInt(666666666);
        Transactions transaction = new Transactions();
        transaction.setTransactionId(transactionId);
        transaction.setAccountId(sourceAccount.getAccountId());
        transaction.setAccountType(sourceAccount.getAccountName());
        transaction.setOperationType(request.getOperationType());
        transaction.setUser(userService.getUserById(request.getUserId()).get());
        transaction.setDepositWithdrawStatus("Pending");
        transaction.setDepositWithdrawAmount(request.getDepositWithdrawAmount());
        transaction.setDetails("Operation is pending approval");
        transactionRepository.save(transaction);
    }

    public List<TransactionRequest> getAllPendingTransactions() {
        List<Transactions> pendingTransactions = transactionRepository.findBydepositWithdrawStatusEquals("Pending");
        return pendingTransactions.stream().map(transaction ->
                new TransactionRequest(transaction.getTransactionId(),
                        transaction.getUser().getUserId(),
                        0,
                        0,
                        0,
                        transaction.getAccountId(),
                        transaction.getAccountType(),
                        transaction.getTransactionDate(),
                        transaction.getOperationType(),
                        transaction.getDetails(),
                        transaction.getDepositWithdrawAmount(),
                        transaction.getDepositWithdrawStatus()))
                .collect(Collectors.toList());
    }

    public void updateTransactionStatus(int transactionId, String status) {
        Transactions request = transactionRepository.findById(transactionId).get();
        Account account = accountService.getAccountById(request.getAccountId()).get();
        if (status.equals("Approved")){
            request.setDepositWithdrawStatus("Approved");
            request.setDetails("Request approved, changes will reflect immediately.");
            int amount = request.getDepositWithdrawAmount();
            if(request.getOperationType().equals("withdraw")){
                int newBalance = account.getAccountBalance() - amount;
                if(newBalance < 0){
                    throw new RuntimeException("Balance does not allow this withdraw.");
                }else{
                    account.setAccountBalance(newBalance);
                }
            }else if (request.getOperationType().equals("deposit")){
                int newBalance = account.getAccountBalance() + amount;
                account.setAccountBalance(newBalance);
            }
        }else{
            request.setDepositWithdrawStatus("Declined");
            request.setDetails("Sorry request Declined, please reach customer service.");
        }
        transactionRepository.save(request);
    }
}
