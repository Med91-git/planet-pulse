CREATE TABLE t_region(
   id INTEGER GENERATED ALWAYS AS IDENTITY, --surrogate key
   region_name VARCHAR(9) NOT NULL, -- natural key
   CONSTRAINT t_region_pk PRIMARY KEY(id) -- primary key
);
CREATE UNIQUE INDEX t_region_region_name_uk ON t_region(upper(region_name)); -- natural key (secondary?)

CREATE TABLE t_subregion(
   id INTEGER GENERATED ALWAYS AS IDENTITY, --surrogate key
   subregion_name VARCHAR(25) NOT NULL, -- natural key
   region_id INTEGER NOT NULL,
   CONSTRAINT t_subregion_pk PRIMARY KEY(id), -- primary key
   CONSTRAINT t_subregion_fk FOREIGN KEY(region_id) REFERENCES t_region(id) -- foreign key region_id
);
CREATE UNIQUE INDEX t_subregion_subregion_name_uk ON t_subregion(upper(subregion_name)); -- natural key (secondary?)

CREATE TABLE t_country(
   id INTEGER GENERATED ALWAYS AS IDENTITY, --surrogate key
   country_iso_code CHAR(2)NOT NULL, -- natural key
   country_common_name VARCHAR(50) UNIQUE NOT NULL,
   country_flag_url VARCHAR(255) UNIQUE NOT NULL,
   country_area_km DECIMAL(9,2) NOT NULL,
   country_population INTEGER NOT NULL,
   subregion_id INTEGER NOT NULL,
   CONSTRAINT t_country_pk PRIMARY KEY(id), -- primary key
   CONSTRAINT t_country_fk FOREIGN KEY(subregion_id) REFERENCES t_subregion(id)
);
CREATE UNIQUE INDEX t_country_iso_code ON t_country(upper(country_iso_code)); -- natural key (secondary?)