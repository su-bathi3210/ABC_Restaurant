package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Reservation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReservationRepository extends MongoRepository<Reservation, ObjectId> {
    List<Reservation> findByBranch(String branch);
}
