Checks if a NPC can walk from its present location to a specified position.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC we wish to check. |
| `pos` | Destination `[x, y]` or `[x, y, z]`. With two elements, `z` defaults to zero. |

#### Return

`true` if the NPC can walk to the supplied destination, `false` otherwise.

Invalid NPCs, positions with fewer than two elements, and negative `z` values return `false`. The path test accepts reaching within one tile of the destination; it does not require occupying that exact tile. SI beta also has `UI_sib_is_dest_reachable(pos, npc)`, with the arguments reversed.
