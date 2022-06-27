package com.kamar.onlinebanking.api;


import com.kamar.onlinebanking.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public interface UserApi {

    @PostMapping("/login")
    ResponseEntity<ResponseModel<UserData>> Login(@RequestBody LoginRequest request);

    @PostMapping("/register")
    ResponseEntity<ResponseModel<UserData>> Register(@Valid @RequestBody UserData request);

    @PatchMapping("/profile")
    ResponseEntity<ResponseModel<UserData>> UpdateProfile( @RequestBody UserData request);

    @PostMapping("/chequeRequest")
    ResponseEntity<ResponseModel<UserData>> CreateChequeRequest(@RequestBody UserChequeRequest request);

    @PostMapping("/transferMoney")
    ResponseEntity<ResponseModel<UserData>> TransferMoney(@RequestBody TransactionRequest request);

    @PostMapping("/withdrawOrDeposit")
    ResponseEntity<ResponseModel<UserData>> WithdrawOrDeposit(@RequestBody TransactionRequest request);

}
