package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Menu;
import abc.example.abcResturant.Repository.MenuRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    // Create a new menu item
    public Menu createMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    // Retrieve all menu items
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    // Retrieve a menu item by ID
    public Menu getMenuById(ObjectId id) {
        return menuRepository.findById(id).orElse(null);
    }

    // Update a menu item
    public Menu updateMenu(ObjectId id, Menu menu) {
        if (menuRepository.existsById(id)) {
            menu.setId(id);  // Ensure the ID is set for update
            return menuRepository.save(menu);
        }
        return null;
    }

    // Delete a menu item
    public boolean deleteMenu(ObjectId id) {
        if (menuRepository.existsById(id)) {
            menuRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
