package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    // Additional query methods can be defined here if needed
}
