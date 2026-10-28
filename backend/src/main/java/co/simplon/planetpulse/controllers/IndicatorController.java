package co.simplon.planetpulse.controllers;

import co.simplon.planetpulse.dtos.indicator.IndicatorCreate;
import co.simplon.planetpulse.dtos.indicator.IndicatorView;
import co.simplon.planetpulse.services.IndicatorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")
@CrossOrigin("*")
public class IndicatorController {

    private final IndicatorService service;

    public IndicatorController(IndicatorService service) {
        this.service = service;
    }

    @GetMapping("/{countryId}/indicators")
    public List<IndicatorView> getIndicators(@PathVariable Long countryId) {
        return service.getByCountryId(countryId);
    }

    @PostMapping("/{countryId}/indicators")
    @ResponseStatus(HttpStatus.CREATED)
    public IndicatorView postIndicator(
            @PathVariable Long countryId,
            @RequestBody @Valid IndicatorCreate inputs
    ) {
        return service.save(countryId, inputs);
    }

    @DeleteMapping("/indicators/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteIndicator(@PathVariable Long id) {
        service.delete(id);
    }
}