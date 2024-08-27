package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Table;
import abc.example.abcResturant.Service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/table")
public class TableController {

    @Autowired
    private TableService tableService;

    @GetMapping
    public List<Table> getAllTables() {
        return tableService.getAllTables();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Table> getTableById(@PathVariable String id) {
        Optional<Table> table = tableService.getTableById(id);
        return table.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Table createTable(@RequestBody Table table) {
        return tableService.createTable(table);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Table> updateTable(@PathVariable String id, @RequestBody Table updatedTable) {
        Table table = tableService.updateTable(id, updatedTable);
        if (table != null) {
            return ResponseEntity.ok(table);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable String id) {
        boolean isDeleted = tableService.deleteTable(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
