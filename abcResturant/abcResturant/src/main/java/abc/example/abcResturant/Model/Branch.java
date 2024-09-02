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
@Document(collection = "branch")

public class Branch {
    @Id
    private ObjectId id;
    private String branchId;
    private String branchName;
    private String branchAddress;
}