//package com.app.global_exception;
//
//import java.nio.file.AccessDeniedException;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import javax.persistence.EntityNotFoundException;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.FieldError;
//import org.springframework.validation.ObjectError;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import com.app.dto.ApiResponse;
//import com.app.exception.ApiException;
//import com.app.exception.ResourceNotFoundException;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ResponseEntity<ApiResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
////        Map<String, String> errors = e.getBindingResult().getAllErrors().stream()
////                .collect(Collectors.toMap(
////                        error -> ((FieldError) error).getField(),
////                        ObjectError::getDefaultMessage,
////                        (existing, replacement) -> existing));
//
//        ApiResponse apiResponse = new ApiResponse("Validation failed");
//       // apiResponse.setErrors(errors);
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
//    }
//    @ExceptionHandler(ApiException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ApiResponse handleApiException(ApiException e) {
//        return new ApiResponse(e.getMessage());
//    }
//    @ExceptionHandler(ResourceNotFoundException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public ApiResponse handleResourceNotFoundException(ResourceNotFoundException e) {
//        return new ApiResponse(e.getMessage());
//    }
//    
//    @ExceptionHandler(AccessDeniedException.class)
//    @ResponseStatus(HttpStatus.FORBIDDEN)
//    public ResponseEntity<ApiResponse> handleAccessDeniedException(AccessDeniedException ex) {
//        ApiResponse apiResponse = new ApiResponse("Access Denied: " + ex.getMessage());
//        return new ResponseEntity<>(apiResponse, HttpStatus.FORBIDDEN);
//    }
//
////    @ExceptionHandler(RuntimeException.class)
////    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
////    public ApiResponse handleAnyException(RuntimeException e) {
////        e.printStackTrace();  // Consider using a logging framework instead
////        return new ApiResponse("An unexpected error occurred");
////    }
//    
//    @ExceptionHandler(EntityNotFoundException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public ApiResponse handleAnyException(ResourceNotFoundException e) {
//        e.printStackTrace();  // Consider using a logging framework instead
//        return new ApiResponse("entity not found");
//    }
//}




package com.app.global_exception;

import java.nio.file.AccessDeniedException;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.dto.ApiResponse;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errors = e.getBindingResult().getAllErrors().stream()
                .collect(Collectors.toMap(
                        error -> ((FieldError) error).getField(),
                        ObjectError::getDefaultMessage,
                        (existing, replacement) -> existing));
                
        ApiResponse apiResponse = new ApiResponse("Validation failed");
       // apiResponse.setErrors(errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    @ExceptionHandler(ApiException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse> handleApiException(ApiException e) {
        ApiResponse apiResponse = new ApiResponse( e.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException e) {
        ApiResponse apiResponse = new ApiResponse( e.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ApiResponse> handleAccessDeniedException(AccessDeniedException ex) {
        ApiResponse apiResponse = new ApiResponse( "Access Denied: " + ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiResponse> handleEntityNotFoundException(EntityNotFoundException e) {
        ApiResponse apiResponse = new ApiResponse( "Entity not found: " );
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    // Optional: handle generic exceptions
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse> handleGenericException(Exception e) {
      //  e.printStackTrace();  // Consider using a logging framework for production
        ApiResponse apiResponse = new ApiResponse("Enter correct credentials");
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }
}
