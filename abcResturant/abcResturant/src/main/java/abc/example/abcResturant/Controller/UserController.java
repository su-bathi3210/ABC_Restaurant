package abc.example.abcResturant.Controller;

import jakarta.servlet.http.HttpSession;
import abc.example.abcResturant.Model.Admin;
import abc.example.abcResturant.Model.Staff;
import abc.example.abcResturant.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Admin endpoints
    @GetMapping("/admin")
    public ResponseEntity<?> getAllAdmins() {
        return ResponseEntity.ok(userService.getAllAdmins());
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable String id) {
        return userService.getAdminById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(userService.addAdmin(admin));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable String id, @RequestBody Admin admin) {
        try {
            return ResponseEntity.ok(userService.updateAdmin(id, admin));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable String id) {
        userService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    // Staff endpoints
    @GetMapping("/staff")
    public ResponseEntity<?> getAllStaff() {
        return ResponseEntity.ok(userService.getAllStaff());
    }

    @GetMapping("/staff/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable String id) {
        return userService.getStaffById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/staff")
    public ResponseEntity<?> registerStaff(@RequestBody Staff staff) {
        return ResponseEntity.ok(userService.addStaff(staff));
    }

    @PutMapping("/staff/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable String id, @RequestBody Staff staff) {
        try {
            return ResponseEntity.ok(userService.updateStaff(id, staff));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/staff/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable String id) {
        userService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }



    // Authentication endpoints
    @PostMapping("/login/admin")
    public ResponseEntity<?> loginAdmin(@RequestParam String username, @RequestParam String password, HttpSession session) {
        Optional<Admin> admin = userService.authenticateAdmin(username, password);
        if (admin.isPresent()) {
            session.setAttribute("user", admin.get());
            return ResponseEntity.ok(admin.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/login/staff")
    public ResponseEntity<?> loginStaff(@RequestParam String username, @RequestParam String password, HttpSession session) {
        Optional<Staff> staff = userService.authenticateStaff(username, password);
        if (staff.isPresent()) {
            session.setAttribute("user", staff.get());
            return ResponseEntity.ok(staff.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }



    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // Invalidate the session
        return ResponseEntity.ok("Logged out successfully");
    }





    // Inner class for login requests

}
