package ma.fstt.gestionstations.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "carburants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carburant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nom;

    @Column(nullable = false)
    private String description;

    @ManyToMany(mappedBy = "carburants", fetch = FetchType.LAZY)
    private Set<Station> stations = new HashSet<>();
}

