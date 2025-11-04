package ma.fstt.gestionstations.repositories;

import ma.fstt.gestionstations.entities.Carburant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarburantRepository extends JpaRepository<Carburant, Long> {
}

