package co.simplon.planetpulse.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PlanetPulseCreate(
        @NotNull(message = "Year is required")
        @Positive(message = "Year must be a positive number")
        Integer year,

        Double co2Emission,

        @Positive(message = "Forest area must be a positive number")
        Double forestArea,

        @Positive(message = "Renewable energy share must be a positive number")
        Double renewableEnergyShare,

        @Positive(message = "PM exposure must be a positive number")
        Double pmExposure
) {
        // Helper method: Checks if the user left ALL environmental fields blank.
        // It returns 'true' only if Forest, CO2, Renewable Energy, and PM are ALL empty (null).
        public boolean hasNoIndicators() {
                return forestArea == null
                        && co2Emission == null
                        && renewableEnergyShare == null
                        && pmExposure == null;
        }
}
