## Entity: PRIORITY LEVEL

**Logical / Table name**: `t_priority_levels`

| Conceptual name | Logical name | Description | Business rules | Generic type | Target type | Notes, constraints | Example |
| --- | --- | --- | --- | --- | --- | --- | --- |
| _n/a_ | `id_priority_level` | Surrogate key | _n/a_ | Integer | SMALLINT / IDENTITY | PK, GENERATED ALWAYS | 2 |
| level label | `level_label` | The label (name in English) of the level | One of: Low, Medium, High | Text | VARCHAR(10) | NOT NULL, (_Natural_) unique key (case insensitive) | Medium |

## Entity: MONITORING PRIORITY

**Logical / Table name**: `t_monitoring_priorities`

| Conceptual name | Logical name | Description | Business rules | Generic type | Target type | Notes, constraints | Example |
| --- | --- | --- | --- | --- | --- | --- | --- |
| _n/a_ | `id_monitoring_priority` | Surrogate key | _n/a_ | Integer | SMALLINT / IDENTITY | PK, GENERATED ALWAYS | 1 |
| Country (R) | `country_id` | Relation to country (identifying), the monitored country | Must exist | Integer | SMALLINT | FK, NOT NULL, Composite _natural_ unique key with year | 42 |
| monitored year | `monitored_year` | The monitored year for a given country | Must exist, default to current year, when added must be current year of following year (n+1) | Integer | SMALLINT | NOT NULL, Composite _natural_ unique key with country | 2026 |
| Priority level (R) | `priority_level_id` | Relation to priority level, indicates a level of attention for the monitored country and year | Must exist | Integer | SMALLINT | FK, NOT NULL | 2 |
