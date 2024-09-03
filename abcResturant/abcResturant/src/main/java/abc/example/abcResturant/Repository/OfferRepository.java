package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface OfferRepository extends MongoRepository<Offer, String> {
    Optional<Offer> findByOfferId(String offerId);
}
