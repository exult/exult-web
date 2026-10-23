Changes the schedule table of an NPC for the desired time period. This new schedule is persistent across save games. The NPC will execute his/her new schedule in the map he/she currently resides when the time comes.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose schedule table is to be changed. |
| `time` | An integer specifying the time period of the new schedule. Must be an integer in the 0-7 range, such as those returned by the `part_of_day` intrinsic. |
| `sched` | An integer specifying the new schedule. Must be an integer in the 0-31 range, such as those returned by the `get_schedule_type` intrinsic. |
| `loc` | A (x, y, z) location, specifying the location of the new schedule. Value of z is optional, defaults to 0. |
