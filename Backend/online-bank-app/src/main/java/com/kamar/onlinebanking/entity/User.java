package com.kamar.onlinebanking.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="user")
@Getter
@Setter
@AllArgsConstructor
public class User {
    @Id
    @Column(name = "user_id")
    private int userId;
    @Column(name = "first_name")
    private String userFirstName;
    @Column(name = "last_name")
    private String userLastName;
    @Column(name = "username")
    private String userName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "password")
    private String password;
    @Column(name = "type")
    private String type;
    @Column(name = "enabled")
    private boolean enabled;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user")
    private Set<Account> accounts = new HashSet<>();
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user")
    private Set<ChequeRequests> chequeRequests = new HashSet<>();
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user")
    private Set<Transactions> transactions = new HashSet<>();

    public User() { }
}
