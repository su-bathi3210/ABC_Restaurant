package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Gallery;
import abc.example.abcResturant.Model.Gallery.Item;
import abc.example.abcResturant.Service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;


    // Get all galleries
    @GetMapping
    public List<Gallery> getAllGalleries() {
        return galleryService.getAllGalleries();
    }

    @GetMapping("/gallery")
    public ResponseEntity<Map<String, Object>> getGalleryImagesByName(@RequestParam String name) {
        Optional<Gallery> gallery = galleryService.getGalleryByName(name);
        if (gallery.isPresent()) {
            List<String> images = gallery.get().getImages().stream()
                    .map(Gallery.Item::getImageData) // Assuming this gets the image URLs
                    .collect(Collectors.toList());
            Map<String, Object> response = new HashMap<>();
            response.put("images", images);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("images", new ArrayList<>()));
    }

    // Get a gallery by ID
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable String id) {
        Optional<Gallery> gallery = galleryService.getGalleryById(id);
        return gallery.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new gallery
    @PostMapping
    public Gallery addGallery(@RequestBody Gallery gallery) {
        return galleryService.addGallery(gallery);
    }

    // Update a gallery by ID
    @PutMapping("/{id}")
    public ResponseEntity<Gallery> updateGallery(@PathVariable String id, @RequestBody Gallery gallery) {
        Gallery updatedGallery = galleryService.updateGallery(id, gallery);
        if (updatedGallery != null) {
            return ResponseEntity.ok(updatedGallery);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a gallery by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable String id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }

    // Add an item to a gallery
    @PostMapping("/{galleryId}/item")
    public ResponseEntity<Gallery> addItemToGallery(@PathVariable String galleryId, @RequestBody Item item) {
        Gallery updatedGallery = galleryService.addItemToGallery(galleryId, item);
        if (updatedGallery != null) {
            return ResponseEntity.ok(updatedGallery);
        }
        return ResponseEntity.notFound().build();
    }

    // Update an item in a gallery
    @PutMapping("/{galleryId}/item/{itemId}")
    public ResponseEntity<Gallery> updateItemInGallery(@PathVariable String galleryId, @PathVariable String itemId, @RequestBody Item item) {
        Gallery updatedGallery = galleryService.updateItemInGallery(galleryId, itemId, item);
        if (updatedGallery != null) {
            return ResponseEntity.ok(updatedGallery);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete an item from a gallery
    @DeleteMapping("/{galleryId}/item/{itemId}")
    public ResponseEntity<Gallery> deleteItemFromGallery(@PathVariable String galleryId, @PathVariable String itemId) {
        Gallery updatedGallery = galleryService.deleteItemFromGallery(galleryId, itemId);
        if (updatedGallery != null) {
            return ResponseEntity.ok(updatedGallery);
        }
        return ResponseEntity.notFound().build();
    }
}
