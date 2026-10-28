package co.simplon.planetpulse.dtos.indicator;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record IndicatorCreate(
        @NotNull(message = "Year is required")
        @Min(value = 1900, message = "Year must be at least 1900")
        @Max(value = 2100, message = "Year cannot exceed 2100")
        Integer year,

        @PositiveOrZero(message = "CO2 emission must be positive")
        Double co2Emissions,

        @PositiveOrZero(message = "Renewable energy share must be positive")
        Double renewableEnergyShare,

        @PositiveOrZero(message = "Forest area must be positive")
        Double forestArea,

        @PositiveOrZero(message = "PM2.5 exposure must be positive")
        Double pm25Exposure
) {
        public boolean hasAtLeastOneIndicator() {
                return co2Emissions != null || renewableEnergyShare != null || forestArea != null || pm25Exposure != null;
        }
}