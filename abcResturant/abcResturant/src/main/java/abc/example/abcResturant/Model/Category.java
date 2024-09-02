package abc.example.abcResturant.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "category")
public class Category {

    @Id
    private String id;
    private String menuName;
    private String menuImage;

    // Constructors
    public Category() {}

    public Category(String menuName, String menuImage) {
        this.menuName = menuName;
        this.menuImage = menuImage;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuImage() {
        return menuImage;
    }

    public void setMenuImage(String menuImage) {
        this.menuImage = menuImage;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id='" + id + '\'' +
                ", menuName='" + menuName + '\'' +
                ", menuImage='" + menuImage + '\'' +
                '}';
    }
}
