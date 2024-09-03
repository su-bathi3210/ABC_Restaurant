package abc.example.abcResturant.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Getter
@Document(collection = "cart")
public class Cart {
    // Getters and setters
    @Setter
    @Id
    private String id; // ObjectId for MongoDB
    private final String orderId; // auto-generated
    @Setter
    private String userName;
    @Setter
    private List<CartItem> items;
    @Setter
    private String phoneNumber;
    @Setter
    private String address;
    @Setter
    private String option;
    @Setter
    private String outlet;
    @Setter
    private String status;

    public Cart(String id, String orderId, String userName, List<CartItem> items, String phoneNumber, String address, String option, String outlet, String status) {
        this.id = id;
        this.orderId = orderId;
        this.userName = userName;
        this.items = items;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.option = option;
        this.outlet = outlet;
        this.status = status;
    }

    public Cart() {
        this.orderId = UUID.randomUUID().toString();
    }

    // Method to calculate the total cost of all items in the cart
    public double getTotal() {
        return items.stream()
                .mapToDouble(CartItem::getTotal)
                .sum();
    }

    // Inner class for CartItem
    @Getter
    public static class CartItem {
        @Setter
        private String itemId; // MongoDB ObjectId
        @Setter
        private String name;
        @Setter
        private double price;
        private int quantity;
        private double total;

        public CartItem(String itemId, String name, double price, int quantity) {
            this.itemId = itemId;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.total = price * quantity; // Calculate total for the item
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
            this.total = this.price * this.quantity; // Update total when quantity changes
        }

    }
}
