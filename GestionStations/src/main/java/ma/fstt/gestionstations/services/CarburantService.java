package ma.fstt.gestionstations.services;

import ma.fstt.gestionstations.entities.Carburant;
import ma.fstt.gestionstations.repositories.CarburantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CarburantService {
    @Autowired
    private CarburantRepository carburantRepository;

    public List<Carburant> getAllCarburants() {
        return carburantRepository.findAll();
    }

    public Optional<Carburant> getCarburantById(Long id) {
        return carburantRepository.findById(id);
    }

    public Carburant saveCarburant(Carburant carburant) {
        return carburantRepository.save(carburant);
    }

    public Carburant updateCarburant(Long id, Carburant carburantDetails) {
        Carburant carburant = carburantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carburant not found with id: " + id));
        
        carburant.setNom(carburantDetails.getNom());
        carburant.setDescription(carburantDetails.getDescription());
        
        return carburantRepository.save(carburant);
    }

    public void deleteCarburant(Long id) {
        carburantRepository.deleteById(id);
    }
}

