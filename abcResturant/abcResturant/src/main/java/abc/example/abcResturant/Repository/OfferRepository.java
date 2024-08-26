package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OfferRepository extends MongoRepository<Offer, String> {
}
