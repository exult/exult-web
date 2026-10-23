Closes an object's gump.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose gump is to be closed. |

> **IMPORTANT NOTES**
>
> This intrinsic does nothing if called when `event == READIED` or `event == UNREADIED`. See '`UI_close_gump2`' if you need it to work in these cases.
