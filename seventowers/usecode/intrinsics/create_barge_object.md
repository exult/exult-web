Creates a barge object with the specified width, height and direction.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `width` | The width (x), in tiles, of the barge object. |
| `height` | The height (y), in tiles, of the barge object. |
| `dir` | This optional parameter sets the barge's initial direction. If missing, it is assumed to be north (0). |

#### Return

An object reference to the newly created barge object. This object is pushed into the 'last created' LIFO stack, and starts out in 'limbo'; it will remain there until placed either, in the game world through the '`UI_update_last_created`' intrinsic or inside a container through the '`UI_give_last_created`' intrinsic.
