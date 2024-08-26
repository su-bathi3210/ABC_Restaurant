package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Offer;
import abc.example.abcResturant.Repository.OfferRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private static final Logger logger = LoggerFactory.getLogger(OfferService.class);

    @Autowired
    private OfferRepository offerRepository;

    // Create or update an offer
    public Offer saveOffer(Offer offer) {
        try {
            return offerRepository.save(offer);
        } catch (Exception e) {
            logger.error("Error saving offer: {}", e.getMessage());
            throw new RuntimeException("Failed to save offer", e);
        }
    }

    // Retrieve all offers
    public List<Offer> getAllOffers() {
        try {
            return offerRepository.findAll();
        } catch (Exception e) {
            logger.error("Error retrieving offers: {}", e.getMessage());
            throw new RuntimeException("Failed to retrieve offers", e);
        }
    }

    // Retrieve an offer by ID
    public Optional<Offer> getOfferById(ObjectId id) {
        try {
            return offerRepository.findById(id.toHexString());
        } catch (Exception e) {
            logger.error("Error retrieving offer by ID: {}", e.getMessage());
            throw new RuntimeException("Failed to retrieve offer", e);
        }
    }

    // Delete an offer by ID
    public void deleteOfferById(ObjectId id) {
        try {
            if (offerRepository.existsById(id.toHexString())) {
                offerRepository.deleteById(id.toHexString());
            } else {
                logger.warn("Offer with ID {} does not exist", id);
                throw new RuntimeException("Offer not found");
            }
        } catch (Exception e) {
            logger.error("Error deleting offer: {}", e.getMessage());
            throw new RuntimeException("Failed to delete offer", e);
        }
    }
}
