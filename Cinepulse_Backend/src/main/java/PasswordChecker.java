import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordChecker {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "aj@123"; // Password you are testing
        String encodedPassword = "$2a$10$rLCUkBHNY7dWl8pEYT6.5uALbQVd9z4dfDTKX9qXMcmzwuWChpx7m"; // Encoded password from your database

        boolean matches = encoder.matches(rawPassword, encodedPassword);
        System.out.println("Password matches: " + matches);
    }
}


