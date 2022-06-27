package com.kamar.onlinebanking.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "cheques")
@Getter
@Setter
@AllArgsConstructor
public class ChequeRequests {
    @Id
    @Column(name = "request_id")
    private int requestId;
    @Column(name = "account_id")
    private int accountId;
    @Column(name = "account_type")
    private String accountType;
    @Column(name = "status")
    private String status;
    @Column(name = "notes")
    private String notes;
    @Column(name = "details")
    private String details;
    @ManyToOne(optional=false)
    @JoinColumn(name = "fk_user")
    private User user;

    public ChequeRequests() { }
}
