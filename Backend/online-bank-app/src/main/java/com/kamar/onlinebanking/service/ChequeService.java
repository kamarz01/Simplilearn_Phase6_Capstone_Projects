package com.kamar.onlinebanking.service;

import com.kamar.onlinebanking.dto.UserChequeRequest;
import com.kamar.onlinebanking.entity.ChequeRequests;
import com.kamar.onlinebanking.entity.User;
import com.kamar.onlinebanking.repository.ChequeRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class ChequeService {
    @Autowired
    private UserService userService;
    @Autowired
    private ChequeRequestsRepository chequeRequestsRepository;

    public void CreateChequeRequest(UserChequeRequest request) {
        List<ChequeRequests> list = chequeRequestsRepository
                .findBystatusEquals("New/Pending")
                .stream().filter(c -> c.getUser().getUserId() == request.getUserId())
                .collect(Collectors.toList());
        if(list.size() > 0)
            throw new RuntimeException("You already have one request pending");
        User user = userService.getUserById(request.getUserId()).get();
        int requestId = new Random().nextInt(10000);
        ChequeRequests chequeRequest =
                new ChequeRequests(requestId,
                        request.getAccountId(),
                        request.getAccountType(),
                        "New/Pending",
                        request.getNotes(),
                        "",
                        user);
        chequeRequestsRepository.save(chequeRequest);
    }

    public List<UserChequeRequest> getAllChequeRequests(){
        List<ChequeRequests> list = chequeRequestsRepository.findAll();
        return list.stream().map(req ->
            new UserChequeRequest(req.getUser().getUserId(),
                    req.getRequestId(),
                    req.getAccountId(),
                    req.getAccountType(),
                    req.getStatus(),
                    req.getNotes(),
                    req.getDetails())
        ).collect(Collectors.toList());
    }

    public void updateRequestStatus(int requestId, String status) {
        ChequeRequests request = chequeRequestsRepository.findById(requestId).get();
        if (status.equals("Approved")){
            int bookId = new Random().nextInt(3434343);
            request.setStatus("Approved");
            request.setDetails(String.format("Request approved.\nCheque Book Id = %s",bookId));
        }else{
            request.setStatus("Declined");
            request.setDetails("Sorry request Declined.");
        }
        chequeRequestsRepository.save(request);
    }
}
