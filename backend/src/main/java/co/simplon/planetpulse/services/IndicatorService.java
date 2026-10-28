package co.simplon.planetpulse.services;

import co.simplon.planetpulse.dtos.indicator.IndicatorCreate;
import co.simplon.planetpulse.dtos.indicator.IndicatorView;
import co.simplon.planetpulse.entities.Indicator;
import co.simplon.planetpulse.repositories.IndicatorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class IndicatorService {

    private final IndicatorRepository repository;

    public IndicatorService(IndicatorRepository repository) {
        this.repository = repository;
    }

    public List<IndicatorView> getByCountryId(Long countryId) {
        return repository.findByCountryId(countryId).stream()
                .map(this::toView)
                .toList();
    }

    @Transactional
    public IndicatorView save(Long countryId, IndicatorCreate inputs) {
        if (!inputs.hasAtLeastOneIndicator()) {
            throw new IllegalArgumentException("At least one indicator value must be provided.");
        }

        Indicator indicator = new Indicator();
        indicator.setCountryId(countryId);
        indicator.setYear(inputs.year());
        indicator.setCo2Emission(inputs.co2Emissions());
        indicator.setRenewableEnergyShare(inputs.renewableEnergyShare());
        indicator.setForestArea(inputs.forestArea());
        indicator.setPm25Exposure(inputs.pm25Exposure());

        Indicator saved = repository.save(indicator);
        return toView(saved);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    private IndicatorView toView(Indicator entity) {
        return new IndicatorView(
                entity.getId(),
                entity.getCountryId(),
                entity.getYear(),
                entity.getCo2Emission(),
                entity.getRenewableEnergyShare(),
                entity.getForestArea(),
                entity.getPm25Exposure()
        );
    }
}