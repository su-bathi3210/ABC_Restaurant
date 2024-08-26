package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Gallery;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface GalleryRepository extends MongoRepository<Gallery, ObjectId> {
    List<Gallery> findByPictureType(String pictureType);
}
