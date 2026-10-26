Sets usecode to be called if an NPC fails to reach its destination. This intrinsic must be used **after** `UI_path_run_usecode`, `UI_si_path_run_usecode`, or `UI_sib_path_run_usecode`, and affects the NPC from the most recent path call. If, for any reason, the NPC in question cannot reach the destination, the usecode function assigned by this intrinsic will be run.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `fun` | The usecode function to be called if the path fails. |
| `obj` | The object that should be used as `item` if the usecode function is called. This must resolve to a valid object. An invalid or zero value leaves any existing failure callback unchanged. |
| `event` | The `event` that should be used if the usecode function is called. |

> **SI SPECIFIC**
>
> In the original SI, this could never affect the failure `event` for `si_path_run_usecode`, which would always be 14. Exult does not suffer from this limitation.

The NPC must still have a usecode path action for the callback to be installed. A path requested with no callback object may use a plain walking action, in which case this intrinsic has no effect.
