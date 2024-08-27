package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Admin;
import abc.example.abcResturant.Model.Staff;
import abc.example.abcResturant.Repository.AdminRepository;
import abc.example.abcResturant.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StaffRepository staffRepository;



    // Admin methods
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);
    }

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }


    public Admin updateAdmin(String id, Admin admin) {
        return adminRepository.findById(id)
                .map(existingAdmin -> {
                    existingAdmin.setUsername(admin.getUsername());
                    existingAdmin.setPassword(admin.getPassword());
                    existingAdmin.setFullName(admin.getFullName());
                    existingAdmin.setPhoneNumber(admin.getPhoneNumber());
                    return adminRepository.save(existingAdmin);
                })
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }

    // Staff methods
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(String id) {
        return staffRepository.findById(id);
    }

    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Staff updateStaff(String id, Staff staff) {
        return staffRepository.findById(id)
                .map(existingStaff -> {
                    existingStaff.setUsername(staff.getUsername());
                    existingStaff.setPassword(staff.getPassword());
                    existingStaff.setFullName(staff.getFullName());
                    existingStaff.setPhoneNumber(staff.getPhoneNumber());
                    existingStaff.setDesignation(staff.getDesignation());
                    existingStaff.setBranch(staff.getBranch());
                    return staffRepository.save(existingStaff);
                })
                .orElseThrow(() -> new RuntimeException("Staff not found"));
    }

    public void deleteStaff(String id) {
        staffRepository.deleteById(id);
    }

    // Customer methods




    // Authentication
    public Optional<Admin> authenticateAdmin(String username, String password) {
        return adminRepository.findByUsername(username).filter(admin -> admin.getPassword().equals(password));
    }

    public Optional<Staff> authenticateStaff(String username, String password) {
        return staffRepository.findByUsername(username).filter(staff -> staff.getPassword().equals(password));
    }


}
