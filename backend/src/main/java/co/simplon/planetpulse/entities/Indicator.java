package co.simplon.planetpulse.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "t_indicators")
public class Indicator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_indicator")
    private Long id;

    @Column(name = "country_id", nullable = false)
    private Long countryId;

    @Column(name = "year_indicator", nullable = false)
    private Integer year;

    @Column(name = "co2_emission")
    private Double co2Emission;

    @Column(name = "renewable_energy_share")
    private Double renewableEnergyShare;

    @Column(name = "forest_area")
    private Double forestArea;

    @Column(name = "pm2_5_exposure")
    private Double pm25Exposure;

    public Indicator() {
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getCo2Emission() {
        return co2Emission;
    }

    public void setCo2Emission(Double co2Emission) {
        this.co2Emission = co2Emission;
    }

    public Double getRenewableEnergyShare() {
        return renewableEnergyShare;
    }

    public void setRenewableEnergyShare(Double renewableEnergyShare) {
        this.renewableEnergyShare = renewableEnergyShare;
    }

    public Double getForestArea() {
        return forestArea;
    }

    public void setForestArea(Double forestArea) {
        this.forestArea = forestArea;
    }

    public Double getPm25Exposure() {
        return pm25Exposure;
    }

    public void setPm25Exposure(Double pm25Exposure) {
        this.pm25Exposure = pm25Exposure;
    }
}