package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    // You can define additional query methods here if needed
}
