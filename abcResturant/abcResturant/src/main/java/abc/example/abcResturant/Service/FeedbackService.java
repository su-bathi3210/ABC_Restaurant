package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Feedback;
import abc.example.abcResturant.Repository.FeedbackRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Fetch all feedbacks
    public List<Feedback> allFeedbacks() {
        return feedbackRepository.findAll();
    }

    // Fetch a single feedback by ID
    public Optional<Feedback> singleFeedback(ObjectId id) {
        return feedbackRepository.findById(id);
    }

    // Add a new feedback
    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Update an existing feedback
    public Feedback updateFeedback(ObjectId id, Feedback feedback) {
        Optional<Feedback> existingFeedbackOpt = feedbackRepository.findById(id);
        if (existingFeedbackOpt.isPresent()) {
            Feedback existingFeedback = existingFeedbackOpt.get();
            existingFeedback.setFeedbackId(feedback.getFeedbackId());
            existingFeedback.setName(feedback.getName());
            existingFeedback.setEmail(feedback.getEmail());
            existingFeedback.setPhoneNumber(feedback.getPhoneNumber());
            existingFeedback.setSubject(feedback.getSubject());
            existingFeedback.setMessage(feedback.getMessage());
            return feedbackRepository.save(existingFeedback);
        } else {
            return null; // or throw an exception
        }
    }

    // Delete a feedback
    public void deleteFeedback(ObjectId id) {
        feedbackRepository.deleteById(id);
    }
}
