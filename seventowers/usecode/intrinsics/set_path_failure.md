Sets usecode to be called if an NPC fails to reach its destination. This intrinsic must be used **after** a call to either, `path_run_usecode` or `si_path_run_usecode` intrinsics, and will affect only the NPC affected by that call. If, for any reason, the NPC in question cannot reach the destination, the usecode function assigned by this intrinsic will be run.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `fun` | The usecode function to be called if the path fails. |
| `obj` | The object that should be used as `item` if the usecode function is called. If this parameter is zero, usecode will **not be called** at all. |
| `event` | The `event` that should be used if the usecode function is called. |

> **SI SPECIFIC**
>
> In the original SI, this could never affect the failure `event` for `si_path_run_usecode`, which would always be 14. Exult does not suffer from this limitation.
