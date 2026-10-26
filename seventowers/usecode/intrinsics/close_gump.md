Closes an object's gump.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose gump is to be closed. |

> **IMPORTANT NOTES**
>
> This intrinsic does nothing while the player is dragging an object. This often matters during `READIED` and `UNREADIED` events, but the check is the dragging state rather than the event ID. Use `UI_close_gump2` to close gumps even while dragging.
