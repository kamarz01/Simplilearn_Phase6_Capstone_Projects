package com.kamar.onlinebanking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseModel<T> {
    private int code;
    private String domain;
    private String error;
    private T data;
}
