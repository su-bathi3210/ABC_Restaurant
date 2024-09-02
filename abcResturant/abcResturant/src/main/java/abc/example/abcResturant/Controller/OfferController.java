package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Offer;
import abc.example.abcResturant.Service.OfferService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/offer")
public class OfferController {

    @Autowired
    private OfferService offerService;

    // Get all offers
    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    // Get offer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable ObjectId id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        return offer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new offer
    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer) {
        Offer createdOffer = offerService.createOffer(offer);
        return new ResponseEntity<>(createdOffer, HttpStatus.CREATED);
    }

    // Update an existing offer
    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable ObjectId id, @RequestBody Offer offer) {
        Optional<Offer> updatedOffer = offerService.updateOffer(id, offer);
        return updatedOffer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete an offer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable ObjectId id) {
        boolean isDeleted = offerService.deleteOffer(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
