package co.simplon.planetpulse.dtos.indicator;

public record IndicatorView(
        Long id,
        Long countryId,
        Integer year,
        Double co2Emissions,
        Double renewableEnergyShare,
        Double forestArea,
        Double pm25Exposure
) {
}