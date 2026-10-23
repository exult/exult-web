Changes the schedule table of an NPC. This new schedule table is persistent across save games. The NPC will execute his/her new schedules in the map he/she currently resides.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose schedule table is to be changed. |
| `time` | An integer, or array of integers, specifying the time periods of the new schedules. Each element of the array is an integer in the 0-7 range, such as those returned by the `part_of_day` intrinsic. |
| `sched` | An integer, or array of schedules, specifying the new schedules. There must be one such schedule for each time period supplied in the 'time' parameter. Each element of this array is an integer in the 0-31 range, such as those returned by the `get_schedule_type` intrinsic. |
| `loc` | An array of (x, y) positions, specifying the new schedule locations. This array must have a (x, y) location for each time period supplied in the 'time' parameter. |
