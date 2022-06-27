package com.kamar.onlinebanking.api;

import com.kamar.onlinebanking.dto.ResponseModel;
import com.kamar.onlinebanking.dto.TransactionRequest;
import com.kamar.onlinebanking.dto.UserChequeRequest;
import com.kamar.onlinebanking.dto.UserData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public interface AdminApi {

    @GetMapping("/getAllUsers")
    ResponseEntity<ResponseModel<List<UserData>>> GetAllUsers();

    @PostMapping("/changeUserState/{userId}")
    ResponseEntity<ResponseModel<List<UserData>>> ChangeUserState(@PathVariable("userId") int userId);

    @GetMapping("/getAllChequeRequests")
    ResponseEntity<ResponseModel<List<UserChequeRequest>>> GetAllChequeRequests();

    @PostMapping("/changeChequeRequestState/{requestId}/{status}")
    ResponseEntity<ResponseModel<List<UserChequeRequest>>> ChangeChequeRequestState(@PathVariable("requestId") int requestId,@PathVariable("status") String status);

    @GetMapping("/getAllPendingTransactions")
    ResponseEntity<ResponseModel<List<TransactionRequest>>> GetAllPendingTransactions();

    @PostMapping("/changeTransactionState/{transactionId}/{status}")
    ResponseEntity<ResponseModel<List<TransactionRequest>>> changeTransactionState(@PathVariable("transactionId") int transactionId,@PathVariable("status") String status);
}
