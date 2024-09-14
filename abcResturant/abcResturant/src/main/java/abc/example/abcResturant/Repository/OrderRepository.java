package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {  // Changed from ObjectId to String
}
