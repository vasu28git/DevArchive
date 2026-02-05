package com.example.devarchive.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.devarchive.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmail(String email);

}