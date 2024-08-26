package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Offer;
import abc.example.abcResturant.Service.OfferService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    // Create or update an offer
    @PostMapping
    public ResponseEntity<Offer> createOrUpdateOffer(@RequestBody Offer offer) {
        Offer savedOffer = offerService.saveOffer(offer);
        return ResponseEntity.ok(savedOffer);
    }

    // Retrieve all offers
    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }

    // Retrieve an offer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable ObjectId id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        return offer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an offer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOfferById(@PathVariable ObjectId id) {
        offerService.deleteOfferById(id);
        return ResponseEntity.noContent().build();
    }
}
