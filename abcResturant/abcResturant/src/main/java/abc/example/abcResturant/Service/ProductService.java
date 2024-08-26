package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Product;
import abc.example.abcResturant.Repository.ProductRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(ObjectId id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(ObjectId id, Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setProductId(productDetails.getProductId());
            product.setProductName(productDetails.getProductName());
            product.setCategoryName(productDetails.getCategoryName());
            product.setProductPrice(productDetails.getProductPrice());
            product.setProductImage(productDetails.getProductImage());
            product.setProductDescription(productDetails.getProductDescription());
            return productRepository.save(product);
        } else {
            return null;
        }
    }

    public void deleteProduct(ObjectId id) {
        productRepository.deleteById(id);
    }
}
