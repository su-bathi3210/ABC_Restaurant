package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Offer;
import abc.example.abcResturant.Repository.OfferRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    // Get all offers
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    // Get an offer by ID
    public Optional<Offer> getOfferById(ObjectId id) {
        return offerRepository.findById(id);
    }

    // Create a new offer
    public Offer createOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    // Update an existing offer
    public Optional<Offer> updateOffer(ObjectId id, Offer offer) {
        if (offerRepository.existsById(id)) {
            offer.setId(id); // Ensure the correct ID is set for the document
            return Optional.of(offerRepository.save(offer));
        } else {
            return Optional.empty();
        }
    }

    // Delete an offer by ID
    public boolean deleteOffer(ObjectId id) {
        if (offerRepository.existsById(id)) {
            offerRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
