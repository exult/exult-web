Causes an NPC to walk to a location and execute the specified usecode function when he/she arrives at the destination. If a path cannot be found for the destination, no usecode will be executed unless a call to `set_path_failure` intrinsic is made before returning from usecode.

The avatar can be prevented from reaching his/her destination simply by moving away from the path; similarly, a scheduled event or scripted event may prevent an NPC from reaching his/her destination. In these cases, the effects of the intrinsic will be cancelled, and the usecode function set by `set_path_failure` will be called. If you want the path to be uninterruptible, the NPC's `DONT_MOVE` flag must be set (this is flag 22 in BG and 16 in SI).

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC that will be affected by this intrinsic. If this isn't a valid NPC, nothing will happen. |
| `pos` | The location that the NPC should walk to. Can be a (x, y) position or a (x, y, z) position. If the z coordinate is missing, or if it is negative, it is assumed to be zero. |
| `event` | The `event` that should be used if the usecode function is called. |
| `obj` | The object that should be used as `item` if the usecode function is called. If this parameter is zero, usecode will **not be called** at all. |
| `fun` | The usecode function to be called if the destination is reached. |
| `flag` | Flag specifying whether or not the usecode function should always be called. If `false`, it will be called only if the NPC can reach its intended destination; if `true`, the specified usecode function will be called even if the destination cannot be reached. The `set_path_failure` intrinsic will override this flag in either case. This failure usecode will use event 'SI_PATH_FAILURE'. |
