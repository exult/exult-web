Sets the desired flag for the given object. Many flags have immediate effects when set; most do not. See the `get_item_flag` intrinsic for flag values.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose flag we wish to set. Not all flags are available for all objects. |
| `flag` | What flag we want to set. This is a number in the 0 to 63 range; it can be any of the values for the 'flag' parameter of the `set_item_flag` intrinsic. |

`ACTIVE_SAILOR` stores `obj` as the current captain, which is returned by `UI_get_item_flag` queries for that flag. Setting `ACTIVE_BARGE`, `ON_MOVING_BARGE`, or SI's `SI_ON_MOVING_BARGE` also selects the barge containing `obj` as the moving barge. These barge queries return booleans.

With the exception of the OKAY_TO_TAKE, TEMPORARY and INVISIBLE flags, these flags are valid for NPCs only. You can get, set or clear any of those values and Exult will not complain; however, it will also not save the values of the flags except for the three mentioned before. Moreover, the INVISIBLE flag will not be saved for objects unless they are of 'quality flags' class.
