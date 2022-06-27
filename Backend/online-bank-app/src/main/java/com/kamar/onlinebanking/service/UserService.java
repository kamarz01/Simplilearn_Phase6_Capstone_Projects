package com.kamar.onlinebanking.service;

import com.kamar.onlinebanking.dto.TransactionRequest;
import com.kamar.onlinebanking.dto.UserAccount;
import com.kamar.onlinebanking.dto.UserChequeRequest;
import com.kamar.onlinebanking.dto.UserData;
import com.kamar.onlinebanking.entity.Account;
import com.kamar.onlinebanking.entity.User;
import com.kamar.onlinebanking.repository.AccountRepository;
import com.kamar.onlinebanking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;

    public Optional<User> getUserById(int userId){
        return userRepository.findById(userId);
    }

    public UserData Login(String username,String password){
        User user = userRepository.findByuserNameAndPassword(username,password);
        return !Objects.isNull(user)
                ? getAllUserInfo(user)
                : null;
    }

    @Transactional
    public UserData Register(UserData registrationRequest){
        if(userExists(registrationRequest.getUsername()))
            throw new RuntimeException(String.format("User with username %s already exists.",registrationRequest.getUsername()),null);
        int userId = new Random().nextInt(1000000);
        User tempUser = new User(userId,
                registrationRequest.getFirstName(),
                registrationRequest.getLastName(),
                registrationRequest.getUsername(),
                registrationRequest.getEmail(),
                registrationRequest.getPhone(),
                registrationRequest.getPassword(),
                "user",
                false,
                null,
                null,
                null);
        Account primaryAccount = new Account(new Random().nextInt(55555555),"Primary",1000);
        primaryAccount.setUser(tempUser);
        Account savingAccount = new Account(new Random().nextInt(44444444),"Saving",500);
        savingAccount.setUser(tempUser);
        Set<Account> accounts = new HashSet<>(Arrays.asList(primaryAccount,savingAccount));
        tempUser.setAccounts(accounts);
        userRepository.save(tempUser);
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent()
                ? getAllUserInfo(user.get())
                : null;
    }

    public UserData UpdateProfile(UserData updateRequest){
        User user = userRepository.findById(updateRequest.getUserId()).get();
        user.setUserFirstName(updateRequest.getFirstName());
        user.setUserLastName(updateRequest.getLastName());
        user.setEmail(updateRequest.getEmail());
        user.setPhone(updateRequest.getPhone());
        user.setPassword(updateRequest.getPassword());
        userRepository.save(user);
        return getAllUserInfo(user);
    }

    public UserData getAllUserInfo(User user){
        return new UserData(user.getUserId(),
                user.getUserFirstName(),
                user.getUserLastName(),
                user.getEmail(),
                user.getUserName(),
                user.getPhone(),
                null,
                user.getType(),
                user.isEnabled(),
                !Objects.isNull(user.getAccounts()) ? user.getAccounts().stream().map(acc ->
                        new UserAccount(acc.getUser().getUserId(),
                                acc.getAccountId(),
                                acc.getAccountName(),
                                acc.getAccountBalance()))
                        .collect(Collectors.toList()) : new ArrayList<>(),
                !Objects.isNull(user.getChequeRequests()) ? user.getChequeRequests().stream().map(cheque ->
                        new UserChequeRequest(user.getUserId(),
                                cheque.getRequestId(),
                                cheque.getAccountId(),
                                cheque.getAccountType(),
                                cheque.getStatus(),
                                cheque.getNotes(),
                                cheque.getDetails()))
                        .collect(Collectors.toList()): new ArrayList<>(),
                !Objects.isNull(user.getTransactions()) ? user.getTransactions().stream().map(transaction ->
                        new TransactionRequest(transaction.getTransactionId(),
                                user.getUserId(),
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
                        .collect(Collectors.toList()): new ArrayList<>());
    }

    public List<UserData> getAllUsersBasicInfo(){
        List<User> users = userRepository.findAll();
        List<UserData> userData= new ArrayList<>();
        users.stream().forEach(user -> {
            userData.add(new UserData(user.getUserId(),
                    user.getUserFirstName(),
                    user.getUserLastName(),
                    user.getEmail(),
                    user.getUserName(),
                    user.getPhone(),
                    null,
                    user.getType(),
                    user.isEnabled(),
                    !Objects.isNull(user.getAccounts()) ? user.getAccounts().stream().map(acc ->
                            new UserAccount(acc.getUser().getUserId(),
                                    acc.getAccountId(),
                                    acc.getAccountName(),
                                    acc.getAccountBalance()))
                            .collect(Collectors.toList()) : new ArrayList<>(),
                    new ArrayList<>(),
                    new ArrayList<>()));
        });
        return userData;
    }

    public void updateState(int userId){
        User user = getUserById(userId).get();
        user.setEnabled(!user.isEnabled());
        userRepository.save(user);
    }

    public boolean userExists(String username){
        return userRepository.findByuserNameEquals(username) != null;
    }

}
