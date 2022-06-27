package com.kamar.onlinebanking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.persistence.Column;

@Data
@AllArgsConstructor
public class UserAccount {
    private int userId;
    private int accountId;
    private String accountName;
    private int accountBalance;
}
