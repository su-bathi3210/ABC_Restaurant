package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Branch;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BranchRepository extends MongoRepository<Branch, String> {
}
