package com.app.service;

import com.app.dto.ForgotPasswordDTO;
import com.app.dto.ResetPasswordDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;
    
    

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
    	
        // Check if username or email already exists
        if (userRepository.findByUsername(userDTO.getUsername()) != null) {
            throw new ApiException("Username already exists");
        }
        if (userRepository.findByEmail(userDTO.getEmail()) != null) {
            throw new ApiException("Email already exists");
        }

        User user = modelMapper.map(userDTO, User.class);
    
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? modelMapper.map(user, UserDTO.class) : null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    @Override
    public UserDTO registerAdmin(UserDTO userDto) {
        // Check if username or email already exists
        if (userRepository.findByUsername(userDto.getUsername()) != null) {
            throw new ApiException("Username already exists");
        }
        if (userRepository.findByEmail(userDto.getEmail()) != null) {
            throw new ApiException("Email already exists");
        }

        User user = modelMapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ADMIN);
        User savedAdmin = userRepository.save(user);
        return modelMapper.map(savedAdmin, UserDTO.class);
    }

    @Override
    public UserDTO registerManager(UserDTO userDto) {
        // Check if username or email already exists
        if (userRepository.findByUsername(userDto.getUsername()) != null) {
            throw new ApiException("Username already exists");
        }
        if (userRepository.findByEmail(userDto.getEmail()) != null) {
            throw new ApiException("Email already exists");
        }

        User user = modelMapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.MANAGER);
        User savedManager = userRepository.save(user);
        return modelMapper.map(savedManager, UserDTO.class);
    }
    
    @Override
    public void generateAndSendOtp(ForgotPasswordDTO forgotPasswordDTO) {
        User user = userRepository.findByEmail(forgotPasswordDTO.getEmail());
        if (user != null) {
            String otp = generateOtp();
            user.setOtp(otp);
            user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(10)); // OTP valid for 10 minutes
            userRepository.save(user);
            try {
                sendOtpEmail(user.getEmail(), otp);
            } catch (Exception e) {
                logger.error("Failed to send OTP email to: {}", user.getEmail(), e);
                throw new ApiException("Failed to send OTP email");
            }
        } else {
            logger.warn("Attempted OTP generation for non-existent email: {}", forgotPasswordDTO.getEmail());
        }
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP for password reset is: " + otp);
        mailSender.send(message);
    }


    @Override
    public boolean resetPassword(ResetPasswordDTO resetPasswordDTO) {
        if (resetPasswordDTO == null ||
            resetPasswordDTO.getEmail() == null ||
            resetPasswordDTO.getOtp() == null ||
            resetPasswordDTO.getNewPassword() == null) {
            throw new IllegalArgumentException("Invalid input data");
        }

        User user = userRepository.findByEmail(resetPasswordDTO.getEmail());
        
        if (user != null && user.getOtp() != null &&
            user.getOtp().equals(resetPasswordDTO.getOtp()) &&
            user.getOtpExpiryTime() != null &&
            user.getOtpExpiryTime().isAfter(LocalDateTime.now())) {

            // Encode the new password and update the user
            user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
            user.setOtp(null);  // Clear OTP after successful password reset
            user.setOtpExpiryTime(null);
            userRepository.save(user);
            return true;
        }
        
        // Optionally log or throw an exception for debugging purposes
        // log.warn("Password reset failed for user with email: " + resetPasswordDTO.getEmail());
        
        return false;
    }

	@Override
	public UserDTO getUserByUserId(Long userId) {
		User user = userRepository.findByUserId(userId);
		if(user == null) {
			throw new ResourceNotFoundException("User not found");
		}
		return modelMapper.map(user, UserDTO.class);
	}

}