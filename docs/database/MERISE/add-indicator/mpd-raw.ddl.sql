CREATE TABLE t_indicators(
   iso_code_2 CHAR(2),
   year_indicator INT,
   co2_emission INT NOT NULL,
   renewable_energy_share DECIMAL(3,1) NOT NULL,
   forest_area DECIMAL(3,1) NOT NULL,
   pm2_5_exposure DECIMAL(4,2) NOT NULL,
   PRIMARY KEY(year_indicator, iso_code_2)
);
