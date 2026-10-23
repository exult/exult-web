Creates a duplicate of the supplied NPC. This duplicate is always of `GOOD` alignment and starts with an `IN_COMBAT` schedule. The clone is placed in a spot near to the original NPC.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC that should be cloned. |

#### Return

An object reference to the clone, or zero if the intrinsic did not receive a valid NPC to clone or if a suitable spot for the clone could not be found.
