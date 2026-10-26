Changes the schedule table of an NPC. This new schedule table is persistent across save games. The NPC will execute his/her new schedules in the map he/she currently resides.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose schedule table is to be changed. |
| `time` | An integer, or array of integers, specifying the time periods of the new schedules. Each element of the array is an integer in the 0-7 range, such as those returned by the `part_of_day` intrinsic. |
| `sched` | An integer, or array of schedules, specifying the new schedules. There must be one such schedule for each time period supplied in the 'time' parameter. Each element of this array is an integer in the 0-31 range, such as those returned by the `get_schedule_type` intrinsic. |
| `loc` | A flat array of locations, with one position per time period: `[x1, y1, x2, y2, ...]` by default, or `[x1, y1, z1, x2, y2, z2, ...]` when `use_3d` is true. |
| `use_3d` | Optional fifth argument, default `false`. Set to `true` to read three coordinates per location. Otherwise, each location uses `z = 0`. |

`time` and `sched` may be scalars for one schedule or arrays for multiple schedules. For array input, supply at least one activity and one complete position per time entry. Invalid NPCs, a non-array `loc`, or insufficient activity or coordinate entries leave the schedule table unchanged. Use `UI_run_schedule(npc)` to apply the activity for the current time period after replacing the table.

```usecode
UI_set_new_schedules(npc, [0, 4], [WAIT, LOITER], [100, 200, 2, 120, 220, 3], true);
```
