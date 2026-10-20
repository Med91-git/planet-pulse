### Entity indicator

| Conceptual Name | Logical Name | Description | Significant Examples | Data Type | Length / Range | PostgreSQL Type | Constraints | Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Year** | `year_indicator` | Indicator from a specific year | 2026 | Integer | 1990 - 2100 | `INT` | `NOT NULL` | |
| **CO² emission** | `co2_emission` | CO² emissions produced by a country | 39.8 | Integer | 0.01 | `INT` | `NOT NULL` | At least one indicator must have a value to be submitted |
| **Renewable energy share** | `renewable_energy_share` | The share of renewable energy is the proportion of energy or electricity coming from renewable sources relative to total consumption or production, expressed as a percentage | 17.5 | Decimal | 0.01 | `DECIMAL(3,1)` | `NOT NULL` | At least one indicator must have a value to be submitted |
| **Forest area** | `forest_area` | Forest density in % | 49.7 | Decimal | 0.01 | `DECIMAL(3,1)` | `NOT NULL` | At least one indicator must have a value to be submitted |
| **PM2.5 exposure** | `pm2_5_exposure` | Exposure to fine airborne particles with a diameter of 2.5 micrometers or less | 27.59 | Decimal | 0.01 | `DECIMAL(4,2)` | `NOT NULL` | At least one indicator must have a value to be submitted |
