CREATE TABLE t_priority_levels(
   level_label VARCHAR(10),
   CONSTRAINT t_priority_levels_pk PRIMARY KEY(level_label)
);

CREATE TABLE t_monitoring_priorities(
   country_iso_code CHAR(2),
   monitored_year SMALLINT,
   level_label VARCHAR(10) NOT NULL,
   CONSTRAINT t_monitoring_priorities_pk PRIMARY KEY(country_iso_code, monitored_year),
   CONSTRAINT t_country_fk FOREIGN KEY(country_iso_code) 
        REFERENCES t_country(country_iso_code),
   CONSTRAINT t_priority_level_fk FOREIGN KEY(level_label) 
        REFERENCES t_priority_levels(level_label)
);
