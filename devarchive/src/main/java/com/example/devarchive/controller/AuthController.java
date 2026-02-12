package com.example.devarchive.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.devarchive.dto.LoginRequest;
import com.example.devarchive.dto.LoginResponse;
import com.example.devarchive.dto.SignupRequest;
import com.example.devarchive.entity.User;
import com.example.devarchive.service.AuthService;
import com.example.devarchive.util.JwtUtil;

@RestController
@RequestMapping("/users")
public class AuthController {

    private final AuthService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

  
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

  
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

   
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {

        userService.register(
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok("User registered successfully..");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        
        LoginResponse response = new LoginResponse(
                user.getUser_id(),
                user.getEmail(),
                user.getUsername(),
                token,
                "Login successful"
        );
        return ResponseEntity.ok(response);
    }
}
