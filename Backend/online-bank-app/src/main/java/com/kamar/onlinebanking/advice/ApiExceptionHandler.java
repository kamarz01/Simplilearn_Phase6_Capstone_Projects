package com.kamar.onlinebanking.advice;

import com.kamar.onlinebanking.dto.ResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Objects;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ResponseBody
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseModel> ExceptionHandler(Exception ex) {
        return new ResponseEntity<>(new ResponseModel(
                400,
                "API-ERROR",
                formatException(ex.getMessage(),ex.getCause()),
                null),
                HttpStatus.BAD_REQUEST);
    }

    private String formatException(String message,Throwable cause){
        return Objects.isNull(cause) ? message : String.format("%s, [%s]",message,cause);
    }

}
