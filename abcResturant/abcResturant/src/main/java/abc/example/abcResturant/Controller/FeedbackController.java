package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Feedback;
import abc.example.abcResturant.Service.FeedbackService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return new ResponseEntity<>(feedbackService.allFeedbacks(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Feedback>> getSingleFeedback(@PathVariable ObjectId id) {
        return new ResponseEntity<>(feedbackService.singleFeedback(id), HttpStatus.OK);
    }

    // Add a new feedback
    @PostMapping
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        Feedback newFeedback = feedbackService.addFeedback(feedback);
        return new ResponseEntity<>(newFeedback, HttpStatus.CREATED);
    }

    // Update an existing feedback by id
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable("id") ObjectId id, @RequestBody Feedback feedback) {
        Feedback updatedFeedback = feedbackService.updateFeedback(id, feedback);
        if (updatedFeedback != null) {
            return ResponseEntity.ok(updatedFeedback);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a feedback by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable("id") ObjectId id) {
        Optional<Feedback> feedback = feedbackService.singleFeedback(id);
        if (feedback.isPresent()) {
            feedbackService.deleteFeedback(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}