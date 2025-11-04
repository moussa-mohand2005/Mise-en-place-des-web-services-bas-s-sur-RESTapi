package ma.fstt.gestionstations.services;

import ma.fstt.gestionstations.entities.HistoCarb;
import ma.fstt.gestionstations.entities.Station;
import ma.fstt.gestionstations.entities.Carburant;
import ma.fstt.gestionstations.repositories.HistoCarbRepository;
import ma.fstt.gestionstations.repositories.StationRepository;
import ma.fstt.gestionstations.repositories.CarburantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HistoCarbService {
    @Autowired
    private HistoCarbRepository histoCarbRepository;
    
    @Autowired
    private StationRepository stationRepository;
    
    @Autowired
    private CarburantRepository carburantRepository;

    public List<HistoCarb> getAllHistoCarb() {
        return histoCarbRepository.findAll();
    }

    public Optional<HistoCarb> getHistoCarbById(Long id) {
        return histoCarbRepository.findById(id);
    }

    public List<HistoCarb> getHistoCarbByStationId(Long stationId) {
        return histoCarbRepository.findByStationId(stationId);
    }

    public List<HistoCarb> getHistoCarbByCarburantId(Long carburantId) {
        return histoCarbRepository.findByCarburantId(carburantId);
    }

    public List<HistoCarb> getHistoCarbByStationAndCarburant(Long stationId, Long carburantId) {
        return histoCarbRepository.findByStationIdAndCarburantId(stationId, carburantId);
    }

    public HistoCarb saveHistoCarb(HistoCarb histoCarb) {
        // Vérifier que la station et le carburant existent
        Station station = stationRepository.findById(histoCarb.getStation().getId())
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + histoCarb.getStation().getId()));
        Carburant carburant = carburantRepository.findById(histoCarb.getCarburant().getId())
                .orElseThrow(() -> new RuntimeException("Carburant not found with id: " + histoCarb.getCarburant().getId()));
        
        histoCarb.setStation(station);
        histoCarb.setCarburant(carburant);
        
        return histoCarbRepository.save(histoCarb);
    }

    public HistoCarb updateHistoCarb(Long id, HistoCarb histoCarbDetails) {
        HistoCarb histoCarb = histoCarbRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HistoCarb not found with id: " + id));
        
        histoCarb.setDate(histoCarbDetails.getDate());
        histoCarb.setPrix(histoCarbDetails.getPrix());
        
        if (histoCarbDetails.getStation() != null && histoCarbDetails.getStation().getId() != null) {
            Station station = stationRepository.findById(histoCarbDetails.getStation().getId())
                    .orElseThrow(() -> new RuntimeException("Station not found with id: " + histoCarbDetails.getStation().getId()));
            histoCarb.setStation(station);
        }
        
        if (histoCarbDetails.getCarburant() != null && histoCarbDetails.getCarburant().getId() != null) {
            Carburant carburant = carburantRepository.findById(histoCarbDetails.getCarburant().getId())
                    .orElseThrow(() -> new RuntimeException("Carburant not found with id: " + histoCarbDetails.getCarburant().getId()));
            histoCarb.setCarburant(carburant);
        }
        
        return histoCarbRepository.save(histoCarb);
    }

    public void deleteHistoCarb(Long id) {
        histoCarbRepository.deleteById(id);
    }
}

