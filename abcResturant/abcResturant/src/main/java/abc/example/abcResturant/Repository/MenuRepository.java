package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Menu;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends MongoRepository<Menu, ObjectId> {
    // Custom query methods can be defined here if needed
}
