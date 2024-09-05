package abc.example.abcResturant;

import abc.example.abcResturant.Exception.ResourceNotFoundException;
import abc.example.abcResturant.Model.User;
import abc.example.abcResturant.Repository.UserRepository;
import abc.example.abcResturant.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User("U-001", "johnDoe", "password", "john@example.com", "CUSTOMER");
    }

    @Test
    void shouldReturnAllUsers() {
        // Arrange
        when(userRepository.findAll()).thenReturn(List.of(user));

        // Act
        var users = userService.allUser();

        // Assert
        assertNotNull(users);
        assertEquals(1, users.size());
    }

    @Test
    void shouldReturnSingleUser() {
        // Arrange
        String userId = "U-001";
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Act
        var foundUser = userService.singleUser(userId);

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals("johnDoe", foundUser.get().getUsername());
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        // Arrange
        String userId = "U-999";
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> userService.singleUser(userId));
    }

    @Test
    void shouldAddUser() {
        // Arrange
        when(userRepository.save(user)).thenReturn(user);

        // Act
        User newUser = userService.addUser(user);

        // Assert
        assertNotNull(newUser);
        assertEquals("johnDoe", newUser.getUsername());
    }

    @Test
    void shouldUpdateUser() {
        // Arrange
        String userId = "U-001";
        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.save(user)).thenReturn(user);

        // Act
        User updatedUser = userService.updateUser(userId, user);

        // Assert
        assertNotNull(updatedUser);
        assertEquals("johnDoe", updatedUser.getUsername());
    }

    @Test
    void shouldDeleteUser() {
        // Arrange
        String userId = "U-001";
        when(userRepository.existsById(userId)).thenReturn(true);
        doNothing().when(userRepository).deleteById(userId);

        // Act
        userService.deleteUser(userId);

        // Assert
        verify(userRepository, times(1)).deleteById(userId);
    }
}
