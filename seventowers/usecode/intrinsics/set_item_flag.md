Sets the desired flag for the given object. Many flags have immediate effects when set; most do not. See the `get_item_flag` intrinsic for flag values.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose flag we wish to set. Not all flags are available for all objects. |
| `flag` | What flag we want to set. This is a number in the 0 to 63 range; it can be any of the values for the 'flag' parameter of the `set_item_flag` intrinsic. |

In the special case of the 'ACTIVE_SAILOR' and 'ACTIVE_BARGE' flags, stores the supplied object, instead of a flag value. This stored object will be returned by future calls of the '`get_item_flag`' intrinsic for the given flag.

With the exception of the OKAY_TO_TAKE, TEMPORARY and INVISIBLE flags, these flags are valid for NPCs only. You can get, set or clear any of those values and Exult will not complain; however, it will also not save the values of the flags except for the three mentioned before. Moreover, the INVISIBLE flag will not be saved for objects unless they are of 'quality flags' class.
