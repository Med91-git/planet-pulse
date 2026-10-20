CREATE TABLE t_regions(
   id_region INTEGER GENERATED ALWAYS AS IDENTITY, --surrogate key
   region_name VARCHAR(9) NOT NULL, -- natural key
   CONSTRAINT t_regions_pk PRIMARY KEY(id_region) -- primary key
);
CREATE UNIQUE INDEX t_regions_region_name_uk ON t_regions(upper(region_name)); -- Case sensitive unique constraint index

CREATE TABLE t_subregions(
   id_subregion INTEGER GENERATED ALWAYS AS IDENTITY, --surrogate key
   subregion_name VARCHAR(25) NOT NULL, -- natural key
   region_id INTEGER NOT NULL,
   CONSTRAINT t_subregion_pk PRIMARY KEY(id_subregion), -- primary key
   CONSTRAINT t_subregion_fk FOREIGN KEY(region_id) REFERENCES t_regions(id_region) -- foreign key
);
CREATE UNIQUE INDEX t_subregion_subregion_name_uk ON t_subregions(upper(subregion_name)); -- Case sensitive unique constraint index

CREATE TABLE t_countries(
   id_country INTEGER GENERATED ALWAYS AS IDENTITY, --surrogate key
   country_iso_code CHAR(2)NOT NULL, -- natural key
   country_common_name VARCHAR(50) NOT NULL,
   country_flag_url VARCHAR(255) UNIQUE NOT NULL,
   country_area_km DECIMAL(9,2) NOT NULL,
   country_population INTEGER NOT NULL,
   subregion_id INTEGER NOT NULL,
   CONSTRAINT t_countries_pk PRIMARY KEY(id_country), -- primary key
   CONSTRAINT t_countries_fk FOREIGN KEY(subregion_id) REFERENCES t_subregions(id_subregion) -- foreign key
);
CREATE UNIQUE INDEX t_countries_iso_code_uk ON t_countries(upper(country_iso_code)); -- Case sensitive unique constraint index
CREATE UNIQUE INDEX t_countries_common_name_uk ON t_countries(upper(country_common_name)); -- Case sensitive unique constraint index
CREATE UNIQUE INDEX t_countries_flag_url_uk ON t_countries(country_flag_url); -- Case sensitive unique constraint index
