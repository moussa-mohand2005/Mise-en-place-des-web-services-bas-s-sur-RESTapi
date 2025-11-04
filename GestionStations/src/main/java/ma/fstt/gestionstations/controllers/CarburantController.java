package ma.fstt.gestionstations.controllers;

import ma.fstt.gestionstations.entities.Carburant;
import ma.fstt.gestionstations.services.CarburantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carburants")
@CrossOrigin(origins = "http://localhost:4200")
public class CarburantController {
    @Autowired
    private CarburantService carburantService;

    @GetMapping
    public ResponseEntity<List<Carburant>> getAllCarburants() {
        List<Carburant> carburants = carburantService.getAllCarburants();
        return ResponseEntity.ok(carburants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carburant> getCarburantById(@PathVariable Long id) {
        return carburantService.getCarburantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Carburant> createCarburant(@RequestBody Carburant carburant) {
        Carburant createdCarburant = carburantService.saveCarburant(carburant);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCarburant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carburant> updateCarburant(@PathVariable Long id, @RequestBody Carburant carburant) {
        try {
            Carburant updatedCarburant = carburantService.updateCarburant(id, carburant);
            return ResponseEntity.ok(updatedCarburant);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarburant(@PathVariable Long id) {
        carburantService.deleteCarburant(id);
        return ResponseEntity.noContent().build();
    }
}

