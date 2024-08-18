package com.app.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ApiResponse {
    private LocalDateTime timeStamp;
    private String message;
    private Map<String, String> errors;

    public ApiResponse(String message) {
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }

    public ApiResponse(String message, Map<String, String> errors) {
        this.message = message;
        this.errors = errors;
        this.timeStamp = LocalDateTime.now();
    }

    // Getters and setters
    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}