CREATE DATABASE planetpulse


CREATE TABLE t_region(
   region_name VARCHAR(9),
   PRIMARY KEY(region_name)
);

CREATE TABLE t_subregion(
   subregion_name VARCHAR(25),
   region_name VARCHAR(9) NOT NULL,
   PRIMARY KEY(subregion_name),
   FOREIGN KEY(region_name) REFERENCES t_region(region_name)
);

CREATE TABLE t_country(
   country_iso_code CHAR(2),
   country_common_name VARCHAR(50),
   country_flag_url VARCHAR(255),
   country_area_km DECIMAL(9,2),
   country_population INTEGER,
   subregion_name VARCHAR(25) NOT NULL,
   PRIMARY KEY(country_iso_code),
   FOREIGN KEY(subregion_name) REFERENCES t_subregion(subregion_name)
);
