CREATE TABLE t_priority_levels(
   id_priority_level SMALLINT GENERATED ALWAYS AS IDENTITY,
   level_label VARCHAR(10) NOT NULL,
   CONSTRAINT t_priority_levels_pk PRIMARY KEY(id_priority_level)
);

CREATE TABLE t_monitoring_priorities(
   id_monitoring_priority SMALLINT GENERATED ALWAYS AS IDENTITY,
   country_id INTEGER NOT NULL,
   monitored_year SMALLINT NOT NULL,
   priority_level_id SMALLINT NOT NULL,
   CONSTRAINT t_monitoring_priorities_pk PRIMARY KEY(id_monitoring_priority),
   CONSTRAINT t_monitoring_priorities_country_year_uk UNIQUE (country_id, monitored_year),
   CONSTRAINT t_country_fk FOREIGN KEY(country_id) REFERENCES t_countries(id_country),
   CONSTRAINT t_priority_level_fk FOREIGN KEY(priority_level_id) REFERENCES t_priority_levels(id_priority_level)
);
