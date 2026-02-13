package main.java.com.example.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String role;
    private String message;
    
    public LoginResponse(String token, String username, String message) {
        this.token = token;
        this.username = username;
        this.message = message;
        this.type = "Bearer";
    }
    
    public LoginResponse(String token, String username, String role, String message) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.message = message;
        this.type = "Bearer";
    }
}