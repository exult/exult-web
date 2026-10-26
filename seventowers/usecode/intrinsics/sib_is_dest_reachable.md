Checks whether an NPC can walk to a destination. This SI beta intrinsic takes its arguments in the opposite order from `UI_is_dest_reachable(npc, pos)`.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `pos` | Destination `[x, y]` or `[x, y, z]`. With two elements, `z` defaults to zero. |
| `npc` | The NPC whose path is checked. |

#### Return

`true` if the NPC can walk to the destination; `false` for an invalid NPC, a position with fewer than two elements, or an unreachable destination.

This intrinsic is available only with `#game "serpentbeta"`. It did not work in the original SI beta; Exult implements the behavior expected by that game's usecode.

A negative `z` returns `false`. As with `UI_is_dest_reachable`, reaching within one tile of the destination is sufficient.
