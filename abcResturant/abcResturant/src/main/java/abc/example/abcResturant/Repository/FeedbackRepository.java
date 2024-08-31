package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {

    // Find all feedbacks with a specific rating
    List<Feedback> findByRating(int rating);

    // Find all feedbacks with a rating greater than or equal to the specified value
    List<Feedback> findByRatingGreaterThanEqual(int rating);

    // Find all feedbacks with a rating less than or equal to the specified value
    List<Feedback> findByRatingLessThanEqual(int rating);

    // Find all feedbacks for a specific customer
    List<Feedback> findByCustomerName(String customerName);
}
