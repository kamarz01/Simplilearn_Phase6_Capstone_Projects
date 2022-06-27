package com.kamar.onlinebanking.repository;

import com.kamar.onlinebanking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Integer> {
    public User findByuserNameAndPassword(String username, String password);
    public User findByuserNameEquals(String username);
}
