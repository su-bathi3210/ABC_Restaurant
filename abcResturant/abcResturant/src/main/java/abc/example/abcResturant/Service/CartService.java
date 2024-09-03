package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Cart;
import abc.example.abcResturant.Model.Cart.CartItem;
import abc.example.abcResturant.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Optional<Cart> getCartById(String id) {
        return cartRepository.findById(id);
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart updateCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteCart(String id) {
        cartRepository.deleteById(id);
    }

    public double calculateTotal(String cartId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            return cartOptional.get().getTotal();
        }
        return 0.0;
    }

    public Cart updateCartItemQuantity(String cartId, String itemId, int newQuantity) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            for (CartItem item : cart.getItems()) {
                if (item.getItemId().equals(itemId)) {
                    item.setQuantity(newQuantity); // Updates total inside CartItem
                    break;
                }
            }
            return cartRepository.save(cart);
        }
        return null;
    }

    public Cart updateCart(String id, Cart updatedCart) {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isPresent()) {
            Cart existingCart = optionalCart.get();

            // Update the existingCart with new values
            existingCart.setStatus(updatedCart.getStatus());

            // Save the updated existingCart back to the repository
            return cartRepository.save(existingCart);
        } else {
            return null; // Or throw an exception
        }
    }

    public Cart saveTempCart(Cart cart) {
        // Logic to save temporary cart data
        return cartRepository.save(cart);
    }

    public Cart getTempCart(String userName) {
        // Logic to retrieve temporary cart data by userName
        return cartRepository.findByUserName(userName);
    }
}
