CREATE TABLE t_indicators (
  id_indicator INT GENERATED ALWAYS AS IDENTITY,
  ISO_code_2 CHAR(2) NOT NULL,
  year_indicator INT NOT NULL,
  CO2_emissions INT,                      
  renewable_energy_share DECIMAL(4,1),    
  forest_area DECIMAL(4,1),               
  "PM2.5_exposure" DECIMAL(4,1),          
  
  -- Defined primary key with an explicit name
  CONSTRAINT t_indicators_pk PRIMARY KEY(id_indicator),
  
  -- Validation constraint
  CONSTRAINT chk_atleast_one_field
  CHECK (COALESCE(CO2_emissions, renewable_energy_share, forest_area, "PM2.5_exposure") IS NOT NULL)
);

CREATE UNIQUE INDEX t_indicators_ISO_code_2_year_indicator_uk ON t_indicators(upper(ISO_code_2), year_indicator);
