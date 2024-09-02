package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Category;
import abc.example.abcResturant.Repository.CategoryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Create or Update a Category
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Get all Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get Category by ID
    public Optional<Category> getCategoryById(ObjectId id) {
        return categoryRepository.findById(id);
    }

    // Get Category by Category ID
    public Category getCategoryByCategoryId(String categoryId) {
        return categoryRepository.findByCategoryId(categoryId);
    }

    // Delete a Category by ID
    public void deleteCategoryById(ObjectId id) {
        categoryRepository.deleteById(id);
    }
}
