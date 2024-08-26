package abc.example.abcResturant.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Offer")
public class Offer {
    @Id
    private ObjectId id;
    private String couponCode;
    private String offerDescription;
    private String offerName;
    private float offerValue;
}
