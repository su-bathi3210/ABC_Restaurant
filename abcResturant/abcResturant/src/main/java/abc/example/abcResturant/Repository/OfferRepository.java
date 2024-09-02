package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Offer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends MongoRepository<Offer, ObjectId> {
    // Custom query methods (if needed) can be defined here
}
