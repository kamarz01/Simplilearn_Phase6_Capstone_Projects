package com.kamar.onlinebanking.controller;

import com.kamar.onlinebanking.api.AdminApi;
import com.kamar.onlinebanking.dto.ResponseModel;
import com.kamar.onlinebanking.dto.TransactionRequest;
import com.kamar.onlinebanking.dto.UserChequeRequest;
import com.kamar.onlinebanking.dto.UserData;
import com.kamar.onlinebanking.service.ChequeService;
import com.kamar.onlinebanking.service.TransactionService;
import com.kamar.onlinebanking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminController implements AdminApi {

    @Autowired
    private UserService userService;
    @Autowired
    private ChequeService chequeService;
    @Autowired
    private TransactionService transactionService;

    @Override
    public ResponseEntity<ResponseModel<List<UserData>>> GetAllUsers() {
        List<UserData> users = userService.getAllUsersBasicInfo();
        return new ResponseEntity<>(new ResponseModel<>(
                users != null ? 200: 400,
                "AdminGetUsers",
                null,
                users),
                users != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<List<UserData>>> ChangeUserState(int userId) {
        userService.updateState(userId);
        List<UserData> users = userService.getAllUsersBasicInfo();
        return new ResponseEntity<>(new ResponseModel<>(
                users != null ? 200: 400,
                "AdminChangeUserState",
                null,
                users),
                users != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<List<UserChequeRequest>>> GetAllChequeRequests() {
        List<UserChequeRequest> reqs = chequeService.getAllChequeRequests();
        return new ResponseEntity<>(new ResponseModel<>(
                reqs != null ? 200: 400,
                "ChequeRequests",
                null,
                reqs),
                reqs != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<List<UserChequeRequest>>> ChangeChequeRequestState(int requestId, String status) {
        chequeService.updateRequestStatus(requestId,status);
        List<UserChequeRequest> reqs = chequeService.getAllChequeRequests();
        return new ResponseEntity<>(new ResponseModel<>(
                reqs != null ? 200: 400,
                "ChequeRequestStatusUpdate",
                null,
                reqs),
                reqs != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<List<TransactionRequest>>> GetAllPendingTransactions() {
        List<TransactionRequest> reqs = transactionService.getAllPendingTransactions();
        return new ResponseEntity<>(new ResponseModel<>(
                reqs != null ? 200: 400,
                "TransactionsRequests",
                null,
                reqs),
                reqs != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ResponseModel<List<TransactionRequest>>> changeTransactionState(int transactionId, String status) {
        transactionService.updateTransactionStatus(transactionId,status);
        List<TransactionRequest> reqs = transactionService.getAllPendingTransactions();
        return new ResponseEntity<>(new ResponseModel<>(
                reqs != null ? 200: 400,
                "ChequeRequestStatusUpdate",
                null,
                reqs),
                reqs != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

}
