package abc.example.abcResturant;

import abc.example.abcResturant.Model.Order;
import abc.example.abcResturant.Repository.OrderRepository;
import abc.example.abcResturant.Service.OrderService;
import abc.example.abcResturant.Exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);  // Initialize Mockito annotations
    }

    // Test allOrder
    @Test
    public void testAllOrder() {
        Order order1 = new Order("O-001", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");
        Order order2 = new Order("O-002", "user2", Arrays.asList("prod3", "prod4"), "2023-09-02", 200.0, "Shipped", "456 Elm St", "PayPal");

        when(orderRepository.findAll()).thenReturn(Arrays.asList(order1, order2));

        List<Order> orders = orderService.allOrder();

        assertEquals(2, orders.size());
        verify(orderRepository, times(1)).findAll();
    }

    // Test singleOrder
    @Test
    public void testSingleOrder() {
        Order order = new Order("O-001", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");

        when(orderRepository.findById("O-001")).thenReturn(Optional.of(order));

        Optional<Order> foundOrder = orderService.singleOrder("O-001");

        assertTrue(foundOrder.isPresent());
        assertEquals("O-001", foundOrder.get().getOrderId());
        verify(orderRepository, times(1)).findById("O-001");
    }

    // Test addOrder
    @Test
    public void testAddOrder() {
        Order order = new Order("O-001", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");

        when(orderRepository.save(order)).thenReturn(order);

        Order savedOrder = orderService.addOrder(order);

        assertNotNull(savedOrder);
        assertEquals("O-001", savedOrder.getOrderId());
        verify(orderRepository, times(1)).save(order);
    }

    // Test updateOrder
    @Test
    public void testUpdateOrder() {
        Order existingOrder = new Order("O-001", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");
        Order updatedOrderDetails = new Order("O-001", "user1", Arrays.asList("prod3", "prod4"), "2023-09-02", 150.0, "Shipped", "456 Elm St", "PayPal");

        when(orderRepository.findById("O-001")).thenReturn(Optional.of(existingOrder));
        when(orderRepository.save(existingOrder)).thenReturn(existingOrder);

        Order updatedOrder = orderService.updateOrder("O-001", updatedOrderDetails);

        assertNotNull(updatedOrder);
        assertEquals("Shipped", updatedOrder.getStatus());
        assertEquals(150.0, updatedOrder.getTotalPrice());
        verify(orderRepository, times(1)).findById("O-001");
        verify(orderRepository, times(1)).save(existingOrder);
    }

    // Test deleteOrder
    @Test
    public void testDeleteOrder() {
        Order existingOrder = new Order("O-001", "user1", Arrays.asList("prod1", "prod2"), "2023-09-01", 100.0, "Pending", "123 Main St", "Credit Card");

        when(orderRepository.findById("O-001")).thenReturn(Optional.of(existingOrder));
        doNothing().when(orderRepository).deleteById("O-001");

        orderService.deleteOrder("O-001");

        verify(orderRepository, times(1)).findById("O-001");
        verify(orderRepository, times(1)).deleteById("O-001");
    }

    // Test deleteOrder when order does not exist
    @Test
    public void testDeleteOrderNotFound() {
        when(orderRepository.findById("O-999")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            orderService.deleteOrder("O-999");
        });

        verify(orderRepository, times(1)).findById("O-999");
    }
}
