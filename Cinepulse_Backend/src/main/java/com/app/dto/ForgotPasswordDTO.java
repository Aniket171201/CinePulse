package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class ForgotPasswordDTO {
	@Email
	@NotBlank
    private String email;
    
    

	public ForgotPasswordDTO() {
		super();
	}



	public ForgotPasswordDTO(String email) {
		super();
		this.email = email;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	@Override
	public String toString() {
		return "ForgotPasswordDTO [email=" + email + "]";
	}
	
    
}