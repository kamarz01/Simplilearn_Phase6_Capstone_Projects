package com.kamar.onlinebanking.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="account")
@Getter
@Setter
public class Account {
    @Id
    @Column(name = "account_id")
    private int accountId;
    @Column(name = "account_name")
    private String accountName;
    @Column(name = "account_balance")
    private int accountBalance;
    @ManyToOne(optional=false)
    @JoinColumn(name = "fk_user")
    private User user;

    public Account() { }

    public Account(int accountId, String accountName, int accountBalance) {
        this.accountId = accountId;
        this.accountName = accountName;
        this.accountBalance = accountBalance;
    }
}
