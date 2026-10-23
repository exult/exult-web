Inspects a NPC's temperature zone. The temperature zone is a grouping of temperature ranges that determine how the NPC is affected by the cold. Like the NPC's temperature, it changes over time depending on whether or not his FREEZE flag is set.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The NPC whose temperature zone is sought. |

#### Return

Zero if anything but an NPC is supplied; otherwise, a number in the 1-5 range, equal to the frame of the stats gump that should be displayed.
