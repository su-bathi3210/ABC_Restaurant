package abc.example.abcResturant.Service;

import abc.example.abcResturant.Exception.ResourceNotFoundException;
import abc.example.abcResturant.Model.Branch;
import abc.example.abcResturant.Repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    // Get all branches
    public List<Branch> getAllBranches() {
        try {
            return branchRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching all branches", e);
        }
    }

    // Get a single branch by branchId
    public Optional<Branch> getBranchById(String branchId) {
        try {
            return branchRepository.findById(branchId);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching the branch with id " + branchId, e);
        }
    }

    // Add a new branch
    public Branch createBranch(Branch branch) {
        try {
            branch.setBranchId(generateBranchId());
            return branchRepository.save(branch);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while creating the branch", e);
        }
    }

    // Generate a new branch ID
    private String generateBranchId() {
        try {
            long count = branchRepository.count();
            return String.format("B-%03d", count + 1);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while generating a new branch ID", e);
        }
    }

    // Update an existing branch by branchId
    public Branch updateBranch(String branchId, Branch branch) {
        try {
            if (!branchRepository.existsById(branchId)) {
                throw new ResourceNotFoundException("Branch not found with id " + branchId);
            }
            branch.setBranchId(branchId);
            return branchRepository.save(branch);
        } catch (ResourceNotFoundException e) {
            throw e; // Propagate ResourceNotFoundException as it is a specific case
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the branch with id " + branchId, e);
        }
    }

    // Delete a branch by branchId
    public void deleteBranch(String branchId) {
        try {
            if (!branchRepository.existsById(branchId)) {
                throw new ResourceNotFoundException("Branch not found with id " + branchId);
            }
            branchRepository.deleteById(branchId);
        } catch (ResourceNotFoundException e) {
            throw e; // Propagate ResourceNotFoundException as it is a specific case
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the branch with id " + branchId, e);
        }
    }
}
