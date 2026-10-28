package co.simplon.planetpulse.repositories;

import co.simplon.planetpulse.entities.Indicator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IndicatorRepository extends JpaRepository<Indicator, Long> {
    List<Indicator> findByCountryId(Long countryId);
}