package com.kamar.onlinebanking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserChequeRequest {
    private int userId;
    private int requestId;
    private int accountId;
    private String accountType;
    private String status;
    private String notes;
    private String details;
}
