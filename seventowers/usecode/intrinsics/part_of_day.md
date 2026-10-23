Gets the number of 3-hour periods that have elapsed in full since midnight.

#### Return

Returns an integer in the 0-7 range corresponding to the number of 3-hour periods that have elapsed in full since midnight. More specifically, the return value is equal to '`UI_game_hour()%3`'. The following constants are defined for convenience:

| MIDNIGHT | = 0 | EARLY | = 1 | DAWN | = 2 | MORNING | = 3 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NOON | = 4 | AFTERNOON | = 5 | EVENING | = 6 | NIGHT | = 7 |
