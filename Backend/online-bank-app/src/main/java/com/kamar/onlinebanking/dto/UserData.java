package com.kamar.onlinebanking.dto;

import com.kamar.onlinebanking.entity.ChequeRequests;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
public class UserData {
    private int userId;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String email;
    @NotNull
    private String username;
    @NotNull
    private String phone;
    @NotNull
    private String password;
    private String type;
    private boolean enabled;
    private List<UserAccount> userAccounts;
    private List<UserChequeRequest> chequeRequests;
    private List<TransactionRequest> transactions;

}
