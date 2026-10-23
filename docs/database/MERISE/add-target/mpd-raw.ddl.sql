CREATE TABLE t_targets(
   iso_code_2 CHAR(2),
   year_target INT,
   co2_emission INT,
   renewable_energy_share DECIMAL(3,1),
   forest_area DECIMAL(3,1),
   pm2_5_exposure DECIMAL(4,2),
   PRIMARY KEY(year_target, iso_code_2)
);
 