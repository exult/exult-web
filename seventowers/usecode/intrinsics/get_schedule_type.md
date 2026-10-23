Gets the current schedule of an NPC.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose schedule is desired. |

#### Return

Zero if 'npc' is not a valid NPC; otherwise, an integer associated to the NPC's current schedule. This is the same value that is reported in the cheat screen, and can be one of the following values:

| IN_COMBAT | = 0 | PACE_HORIZONTAL | = 1 | PACE_VERTICAL | = 2 |
| --- | --- | --- | --- | --- | --- |
| TALK | = 3 | DANCE | = 4 | EAT | = 5 |
| FARM | = 6 | TEND_SHOP | = 7 | MINE | = 8 |
| MINER | = 8 | HOUND | = 9 | STANDTHERE | = 10 |
| LOITER | = 11 | WANDER | = 12 | BLACKSMITH | = 13 |
| SLEEP | = 14 | WAIT | = 15 | MAJOR_SIT | = 16 |
| GRAZE | = 17 | BAKE | = 18 | SEW | = 19 |
| SHY | = 20 | LAB | = 21 | THIEF | = 22 |
| WAITER | = 23 | SPECIAL | = 24 | KID_GAMES | = 25 |
| TAG | = 25 | EAT_AT_INN | = 26 | DUEL | = 27 |
| SPAR | = 27 | PREACH | = 28 | PATROL | = 29 |
| DESK_WORK | = 30 | FOLLOW_AVATAR | = 31 |

> **SI SPECIFIC**
>
> If the NPC is traversing a path created by a call to either, `UI_path_run_usecode` or `UI_si_path_run_usecode` intrinsics, this intrinsic will return the value `WALK_TO_SCHEDULE = 32` instead of the values above.
