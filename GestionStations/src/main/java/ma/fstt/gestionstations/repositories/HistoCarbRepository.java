package ma.fstt.gestionstations.repositories;

import ma.fstt.gestionstations.entities.HistoCarb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface HistoCarbRepository extends JpaRepository<HistoCarb, Long> {
    List<HistoCarb> findByStationId(Long stationId);
    List<HistoCarb> findByCarburantId(Long carburantId);
    
    @Query("SELECT h FROM HistoCarb h WHERE h.station.id = :stationId AND h.carburant.id = :carburantId ORDER BY h.date DESC")
    List<HistoCarb> findByStationIdAndCarburantId(@Param("stationId") Long stationId, @Param("carburantId") Long carburantId);
    
    @Query("SELECT h FROM HistoCarb h WHERE h.station.id = :stationId AND h.date = :date")
    List<HistoCarb> findByStationIdAndDate(@Param("stationId") Long stationId, @Param("date") Date date);
}

