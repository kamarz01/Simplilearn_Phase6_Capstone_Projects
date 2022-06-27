package com.kamar.onlinebanking.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transactions {
    @Id
    @Column(name = "transaction_id")
    private int transactionId;
    @Column(name = "account_id")
    private int accountId;
    @Column(name = "account_type")
    private String accountType;
    @UpdateTimestamp
    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;
    @Column(name = "operation_type")
    private String operationType;
    @Column(name = "details")
    private String details;
    @Column(name = "deposit_withdraw_amount")
    private int depositWithdrawAmount;
    @Column(name = "deposit_withdraw_status")
    private String depositWithdrawStatus;
    @ManyToOne(optional=false)
    @JoinColumn(name = "fk_user")
    private User user;

    public Transactions() { }
}
