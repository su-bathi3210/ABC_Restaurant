package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    // No changes needed here since MongoRepository now works with userId as a String
}
