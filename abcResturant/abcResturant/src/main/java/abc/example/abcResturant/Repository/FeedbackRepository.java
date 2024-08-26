package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Feedback;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, ObjectId> {
    // You can define custom query methods here if needed
}
