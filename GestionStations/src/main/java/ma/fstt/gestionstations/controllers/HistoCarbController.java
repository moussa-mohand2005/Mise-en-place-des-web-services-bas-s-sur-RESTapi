package ma.fstt.gestionstations.controllers;

import ma.fstt.gestionstations.entities.HistoCarb;
import ma.fstt.gestionstations.services.HistoCarbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/histocarb")
@CrossOrigin(origins = "http://localhost:4200")
public class HistoCarbController {
    @Autowired
    private HistoCarbService histoCarbService;

    @GetMapping
    public ResponseEntity<List<HistoCarb>> getAllHistoCarb() {
        List<HistoCarb> histoCarb = histoCarbService.getAllHistoCarb();
        return ResponseEntity.ok(histoCarb);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoCarb> getHistoCarbById(@PathVariable Long id) {
        return histoCarbService.getHistoCarbById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/station/{stationId}")
    public ResponseEntity<List<HistoCarb>> getHistoCarbByStation(@PathVariable Long stationId) {
        List<HistoCarb> histoCarb = histoCarbService.getHistoCarbByStationId(stationId);
        return ResponseEntity.ok(histoCarb);
    }

    @GetMapping("/carburant/{carburantId}")
    public ResponseEntity<List<HistoCarb>> getHistoCarbByCarburant(@PathVariable Long carburantId) {
        List<HistoCarb> histoCarb = histoCarbService.getHistoCarbByCarburantId(carburantId);
        return ResponseEntity.ok(histoCarb);
    }

    @GetMapping("/station/{stationId}/carburant/{carburantId}")
    public ResponseEntity<List<HistoCarb>> getHistoCarbByStationAndCarburant(
            @PathVariable Long stationId,
            @PathVariable Long carburantId) {
        List<HistoCarb> histoCarb = histoCarbService.getHistoCarbByStationAndCarburant(stationId, carburantId);
        return ResponseEntity.ok(histoCarb);
    }

    @PostMapping
    public ResponseEntity<HistoCarb> createHistoCarb(@RequestBody HistoCarb histoCarb) {
        try {
            HistoCarb createdHistoCarb = histoCarbService.saveHistoCarb(histoCarb);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdHistoCarb);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HistoCarb> updateHistoCarb(@PathVariable Long id, @RequestBody HistoCarb histoCarb) {
        try {
            HistoCarb updatedHistoCarb = histoCarbService.updateHistoCarb(id, histoCarb);
            return ResponseEntity.ok(updatedHistoCarb);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHistoCarb(@PathVariable Long id) {
        histoCarbService.deleteHistoCarb(id);
        return ResponseEntity.noContent().build();
    }
}

