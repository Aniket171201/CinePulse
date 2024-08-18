package com.app.dto;


public class ResetPasswordDTO {
    private String email;
    private String otp;
    private String newPassword;
    
    
    
	public ResetPasswordDTO() {
		super();
	}
	public ResetPasswordDTO(String email, String otp, String newPassword) {
		super();
		this.email = email;
		this.otp = otp;
		this.newPassword = newPassword;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	@Override
	public String toString() {
		return "ResetPasswordDTO [email=" + email + ", otp=" + otp + ", newPassword=" + newPassword + "]";
	}
    
    
}