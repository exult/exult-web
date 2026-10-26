Closes all gumps.

> **IMPORTANT NOTES**
>
> This intrinsic does nothing while the player is dragging an object. This often matters during `READIED` and `UNREADIED` events, but the check is the dragging state rather than the event ID. Use `UI_close_gumps2` to close gumps even while dragging.
