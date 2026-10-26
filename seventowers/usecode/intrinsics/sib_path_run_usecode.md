Causes an NPC to walk to a location and execute a usecode function on arrival. This SI beta intrinsic uses the same argument order as `UI_path_run_usecode`, rather than the order used by `UI_si_path_run_usecode`.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC to move. Invalid NPCs cause the call to fail. |
| `pos` | Destination `[x, y]` or `[x, y, z]`. Missing or negative `z` is treated as zero. |
| `fun` | The usecode function to call on arrival. |
| `obj` | The object to use as `item` for the callback. Zero disables the callback. |
| `event` | The callback's event ID. |

#### Return

`true` if a path was successfully started, `false` otherwise. Starting a path does not guarantee that the NPC will reach its destination.

This intrinsic is available only with `#game "serpentbeta"`. It does not take the `flag` argument of `UI_si_path_run_usecode` and does not request that the callback run when the destination cannot be reached. Use `UI_set_path_failure` to supply a failure callback.
