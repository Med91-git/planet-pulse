CREATE TABLE t_targets (
    id_target INTEGER GENERATED ALWAYS AS IDENTITY,
    id_country  INT NOT NULL, 
    year_target INT NOT NULL,
    co2_emission INT,
    renewable_energy_share DECIMAL(3,1),
    forest_area DECIMAL(3,1),
    pm2_5_exposure DECIMAL(4,2),

    -- Technical primary key 
    CONSTRAINT t_targets_pk
        PRIMARY KEY (id_target),

    --Business identifier : a country by year (secondary key)
    CONSTRAINT uq_targets_country_year
        UNIQUE (id_country , year_target),
        
    -- Add constraint foreign key
    CONSTRAINT t_country_fk FOREIGN KEY(id_country) REFERENCES t_countries(id_country) 
    
);
