package co.simplon.planetpulse.controllers;

import co.simplon.planetpulse.dtos.PlanetPulseCreate;
import co.simplon.planetpulse.dtos.PlanetPulseView;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/countries")
public class PlanetPulseController {

    @GetMapping("/{id}")
    public PlanetPulseView getPlanetPulse(@PathVariable Long id) {
        return new PlanetPulseView("Random country (ID: " + id + ")");
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public PlanetPulseView postPlanetPulse(@RequestBody @Valid PlanetPulseCreate inputs) {
        // 1. Manually check if all indicators are missing
        if (inputs.hasNoIndicators()) {
            // Returns an empty HTTP response body (null)
            return null;
        }

        // 2. Normal behavior if at least one indicator is present
        StringBuilder mockName = new StringBuilder("Created record for year " + inputs.year() + " with: ");
        if (inputs.co2Emission() != null) mockName.append("CO2=").append(inputs.co2Emission()).append(" ");
        if (inputs.forestArea() != null) mockName.append("Forest=").append(inputs.forestArea()).append(" ");
        if (inputs.renewableEnergyShare() != null) mockName.append("Renewable=").append(inputs.renewableEnergyShare()).append(" ");
        if (inputs.pmExposure() != null) mockName.append("PM=").append(inputs.pmExposure()).append(" ");

        return new PlanetPulseView(mockName.toString().trim());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deletePlanetPulse(@PathVariable Long id) {
        System.out.println("Deleted record with ID: " + id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void putPlanetPulse(@PathVariable Long id, @RequestBody @Valid PlanetPulseCreate inputs) {
        System.out.println("Updating record ID " + id + " with year: " + inputs.year());
    }
}
