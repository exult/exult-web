Causes the avatar to walk to a location and execute the specified usecode function when he/she arrives at the destination. If a path cannot be found for the destination, no usecode will be executed unless a call to `set_path_failure` intrinsic is made before returning from usecode.

The avatar can be prevented from reaching his/her destination simply by moving away from the path; this will cancel the effects of the intrinsic, and will cause the usecode function set by `set_path_failure` to be called. If you want the path to be uninterruptible, the avatar's `DONT_MOVE` flag must be set (this is flag 22 in BG and 16 in SI).

The other party members will follow the avatar towards the destination.

When `simode` is true, Exult looks for a free spot within 3 tiles of `pos` and allows a rise/drop of 3 in the z direction. If no spot is found, it tries again at the NPC's current height.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `pos` | The location that the avatar should walk to. Can be a (x, y) position or a (x, y, z) position. If the z coordinate is missing, or if it is negative, it is assumed to be zero. |
| `fun` | The usecode function to be called if the destination is reached. |
| `obj` | The object that should be used as `item` if the usecode function is called. If this parameter is zero, usecode will **not be called** at all. |
| `event` | The `event` that should be used if the usecode function is called. |
| `simode` | This optional parameter can be used to control whether or not to use the SI-specific behavior described above. Defaults to `true` in SI (including SI beta) and `false` in BG. Pass an explicit value to choose the behavior in either game. |

#### Return

If no path can be found to the destination, returns `false`; otherwise, returns `true`.

A successful return means a path has been started, not that the destination has been reached. Use the arrival or failure callback to detect the outcome. `UI_sib_path_run_usecode` is a separate SI beta variant that takes an explicit NPC before `pos`.
