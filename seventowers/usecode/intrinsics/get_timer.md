Gets how many hours elapsed since the timer was set.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `timer` | Numeric value indicating the timer to be inspected. |

#### Return

If the specified timer has been initialized by a previous call to '`UI_set_timer`' intrinsic, the return is the number of hours since the initialization (or reinitialization) of the timer. Uninitialized timers return a random number in the 0-12 hour range.
