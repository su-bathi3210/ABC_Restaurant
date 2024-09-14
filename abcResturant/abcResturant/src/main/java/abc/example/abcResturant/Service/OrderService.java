package abc.example.abcResturant.Service;

import abc.example.abcResturant.Exception.ResourceNotFoundException;
import abc.example.abcResturant.Model.Order;
import abc.example.abcResturant.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    public List<Order> allOrder() {
        try {
            return orderRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching all orders", e);
        }
    }

    // Get a single order by orderId
    public Optional<Order> singleOrder(String orderId) {
        try {
            return orderRepository.findById(orderId);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching order with id " + orderId, e);
        }
    }

    // Add a new order
    public Order addOrder(Order order) {
        try {
            order.setOrderId(generateOrderId());
            return orderRepository.save(order);
        } catch (Exception e) {
            throw new RuntimeException("Error adding new order", e);
        }
    }

    // Update an existing order by orderId
    public Order updateOrder(String orderId, Order order) {
        try {
            Optional<Order> existingOrder = orderRepository.findById(orderId);
            if (!existingOrder.isPresent()) {
                throw new ResourceNotFoundException("Order not found with id " + orderId);
            }
            order.setOrderId(orderId); // Ensure the ID in the request body matches the ID in the URL
            return orderRepository.save(order);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error updating order with id " + orderId, e);
        }
    }

    // Delete an order by orderId
    public void deleteOrder(String orderId) {
        try {
            Optional<Order> existingOrder = orderRepository.findById(orderId);
            if (!existingOrder.isPresent()) {
                throw new ResourceNotFoundException("Order not found with id " + orderId);
            }
            orderRepository.deleteById(orderId);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting order with id " + orderId, e);
        }
    }

    // Generate a new order ID
    private String generateOrderId() {
        List<Order> orders = orderRepository.findAll();
        int maxId = 0;

        for (Order order : orders) {
            String orderId = order.getOrderId();
            try {
                int numericPart = Integer.parseInt(orderId.split("-")[1]);
                if (numericPart > maxId) {
                    maxId = numericPart;
                }
            } catch (Exception e) {
                System.err.println("Error parsing order ID: " + orderId);
            }
        }
        int nextId = maxId + 1;
        return String.format("O-%03d", nextId);
    }

}
