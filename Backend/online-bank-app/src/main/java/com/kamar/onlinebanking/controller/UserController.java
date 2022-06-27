package com.kamar.onlinebanking.controller;

import com.kamar.onlinebanking.api.UserApi;
import com.kamar.onlinebanking.dto.*;
import com.kamar.onlinebanking.service.ChequeService;
import com.kamar.onlinebanking.service.TransactionService;
import com.kamar.onlinebanking.service.TransferService;
import com.kamar.onlinebanking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;

@RestController
public class UserController implements UserApi {

    @Autowired
    private UserService userService;
    @Autowired
    private ChequeService chequeService;
    @Autowired
    private TransferService transferService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private EntityManager entityManager;

    @Override
    public ResponseEntity<ResponseModel<UserData>> Login(LoginRequest request) {
        UserData login = userService.Login(request.getUsername(), request.getPassword());
        return new ResponseEntity<>(new ResponseModel<>(
                login != null ? 200: 400,
                "UserLogin",
                null,
                login),
                login != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<UserData>> Register(UserData request) {
        UserData user = userService.Register(request);
        return new ResponseEntity<>(new ResponseModel<>(
                user != null ? 200: 400,
                "UserRegister",
                null,
                user),
                user != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<UserData>> UpdateProfile(UserData request) {
        UserData user = userService.UpdateProfile(request);
        return new ResponseEntity<>(new ResponseModel<>(
                user != null ? 200: 400,
                "UserProfile",
                null,
                user),
                user != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<UserData>> CreateChequeRequest(UserChequeRequest request) {
        chequeService.CreateChequeRequest(request);
        entityManager.clear();
        UserData info = userService.getAllUserInfo(userService.getUserById(request.getUserId()).get());
        return new ResponseEntity<>(new ResponseModel<>(
                info != null ? 200: 400,
                "UserCheques",
                null,
                info),
                info != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<UserData>> TransferMoney(TransactionRequest request) {
        transferService.CheckRecipientAccount(request.getToAccountId());
        transferService.CheckBalance(request.getFromAccountId(),request.getAmount());
        transferService.TransferMoney(request);
        entityManager.clear();
        UserData info = userService.getAllUserInfo(userService.getUserById(request.getUserId()).get());
        return new ResponseEntity<>(new ResponseModel<>(
                info != null ? 200: 400,
                "UserMoneyTransfer",
                null,
                info),
                info != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<UserData>> WithdrawOrDeposit(TransactionRequest request) {
        transactionService.createTransaction(request);
        entityManager.clear();
        UserData info = userService.getAllUserInfo(userService.getUserById(request.getUserId()).get());
        return new ResponseEntity<>(new ResponseModel<>(
                info != null ? 200: 400,
                "WithdrawOrDeposit",
                null,
                info),
                info != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
