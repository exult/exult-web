Clears the desired flag for the given object. Many flags have immediate effects when cleared; most do not. See the `get_item_flag` intrinsic for flag values.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose flag we wish to clear. Not all flags are available for all objects. |
| `flag` | What flag we want to clear. This is a number in the 0 to 63 range; it can be any of the values for the 'flag' parameter of the `set_item_flag` intrinsic. |

Clearing `ACTIVE_SAILOR` clears the stored captain. Clearing `ACTIVE_BARGE`, `ON_MOVING_BARGE`, or SI's `SI_ON_MOVING_BARGE` stops the object's barge if it is the currently moving barge. Clearing `ASLEEP` does not wake an NPC who is knocked out.

With the exception of the OKAY_TO_TAKE, TEMPORARY and INVISIBLE flags, these flags are valid for NPCs only. You can get, set or clear any of those values and Exult will not complain; however, it will also not save the values of the flags except for the three mentioned before. Moreover, the INVISIBLE flag will not be saved for objects unless they are of 'quality flags' class.
