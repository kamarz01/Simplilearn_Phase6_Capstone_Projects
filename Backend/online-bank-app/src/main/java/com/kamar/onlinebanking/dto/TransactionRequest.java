package com.kamar.onlinebanking.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionRequest {
    private int transactionId;
    private int userId;
    private int fromAccountId;
    private int toAccountId;
    private int amount;
    private int accountId;
    private String accountType;
    private LocalDateTime transactionDate;
    private String operationType;
    private String details;
    private int depositWithdrawAmount;
    private String depositWithdrawStatus;
}
