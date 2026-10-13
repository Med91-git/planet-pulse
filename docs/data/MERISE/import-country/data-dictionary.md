
| Conceptual name | Logical name | Description | Significant examples | Data type | Size and/or length | PostgreSQL data type | Constraints | Anomaly |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Common name** | `name_common` | Common name of the country | Vatican City | text | 50 | VARCHAR(50) | NOT NULL |  |
| **ISO code 2 letters** | `iso_code` | ISO 3166-1 alpha-2 code of the country | VA | text | 2 | CHAR(2) | NOT NULL | Partial data |
| **URL of the flag** | `flag_url` | URL of the country's flag | https://flags.restcountries.com/v5/svg/va.svg | text | 255 | VARCHAR(255) | NOT NULL | Partial data |
| **Region** | `region` | Region of the country | Europe | text | 9 | VARCHAR(9) | NOT NULL |  |
| **Subregion** | `subregion` | Subregion of the country | Southern Europe | text | 25 | VARCHAR(25) | NOT NULL | Partial data |
| **Area** | `area_km` | Total area of the country in km² | 0.44 | decimal | 11 | DECIMAL(9,2) | NOT NULL |  |
| **Population** | `population` | Total population of the country | 882 | entier | 10 | INTEGER | NOT NULL |  |