Gets the current schedule of an NPC.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose schedule we wish to change. |
| `sched` | The new schedule type. Can be any of the values listed as the return of a `get_schedule_type` intrinsic call. |

> **SI SPECIFIC**
>
>  The SI-specific value `WALK_TO_SCHEDULE = 32` **cannot** be set with this intrinsic; only a call to either, `UI_path_run_usecode` or `UI_si_path_run_usecode` intrinsics can do that.
