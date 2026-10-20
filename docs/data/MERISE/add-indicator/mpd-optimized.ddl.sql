CREATE TABLE t_indicators (
  id_indicator INT GENERATED ALWAYS AS IDENTITY,
  country_id INT NOT NULL,
  year_indicator INT NOT NULL,
  co2_emission INT,                      
  renewable_energy_share DECIMAL(4,1),    
  forest_area DECIMAL(4,1),               
  pm2_5_exposure DECIMAL(4,1),          
  
  -- Defined primary key with an explicit name
  CONSTRAINT t_indicators_pk PRIMARY KEY(id_indicator),
  CONSTRAINT t_indicators_fk FOREIGN KEY(country_id) REFERENCES t_countries(id_country)
  -- Validation constraint
  CONSTRAINT chk_atleast_one_field
  CHECK (COALESCE(co2_emission, renewable_energy_share, forest_area, PM2_5_exposure) IS NOT NULL)
);

CREATE UNIQUE INDEX t_indicators_year_indicator_uk ON t_indicators(year_indicator);