Inspects the given equipment slot in an NPC.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC we wish to inspect. |
| `spot` | What equipment slot we wish to inspect. Can be any of the values of 'spot' for `is_readied` intrinsic. |

#### Return

Returns zero for an invalid spot or if the spot is empty, otherwise returns an object reference to the object that resides in the desired spot.
