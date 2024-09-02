package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
    // Custom query methods can be defined here, if needed
    Category findByCategoryId(String categoryId);
}
