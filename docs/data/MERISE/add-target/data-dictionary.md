# Data dictionary

| Conceptual entities/attributes name | Logic name | Describing | Relevants examples | Data length (min) | Data length (max) | Unity of measurements | Generic data type | Postgres data type | Constraints | Business rules | Commentaires/anomalies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Country |  | Existing country |  |  |  |  |  |  | required |  |  |
| Target |  |  |  |  |  |  |  |  |  |  |  |
| Year | year_target | Current year by default (or next year) year for a specific indicator | 2026 | 1990 | 2100 |  | entier | integer | NOT NULL, elementary |  |  |
| CO² emission | co2_emission | Country 's annual CO² emissions | 456 | 0 |  | tonnes de CO² | entier | integer | NULL, elementary | At least one indicator must have a value to be submit |  |
| Renewable energy share | renewable_energy_share | Renewable energy consumption (% of total final energy consumption) | 56.8 | 0.01 | 100 | % | decimal | numeric(3,1) | NULL, elementary | At least one indicator must have a value to be submit |  |
| Forest area | forest_area | % of land area (greenery) | 32.7 | 0.01 | 100 | % | decimal | numeric(3,1) | NULL, elementary | At least one indicator must have a value to be submit |  |
| PM2.5 exposure | pm2_5_exposure | Average annual exposure about air polution (microgram per cubic meter) | 37.94 | 0.01 |  | µg/m³ | decimal | numeric(4,2) | NULL, elementary | At least one indicator must have a value to be submit |  |
