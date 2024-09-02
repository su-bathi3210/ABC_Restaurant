package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Category;
import abc.example.abcResturant.Service.CategoryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Add a new Category
    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.saveCategory(category);
        return ResponseEntity.ok(savedCategory);
    }

    // Update an existing Category
    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable ObjectId id, @RequestBody Category category) {
        Optional<Category> existingCategory = categoryService.getCategoryById(id);
        if (existingCategory.isPresent()) {
            category.setId(id); // Ensure the ID remains the same
            Category updatedCategory = categoryService.saveCategory(category);
            return ResponseEntity.ok(updatedCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Category by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable ObjectId id) {
        if (categoryService.getCategoryById(id).isPresent()) {
            categoryService.deleteCategoryById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all Categories
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // Get Category by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable ObjectId id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.isPresent() ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    // Get Category by Category ID
    @GetMapping("/categoryId/{categoryId}")
    public ResponseEntity<Category> getCategoryByCategoryId(@PathVariable String categoryId) {
        Category category = categoryService.getCategoryByCategoryId(categoryId);
        return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }
}
