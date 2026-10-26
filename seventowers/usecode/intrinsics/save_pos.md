Saves the current position/map of an object. This persists across save games, but there is only one 'slot' in which the position is saved. Therefore, only the last stored position is available.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose position we want. |

The current implementation records the object's tile and the current game map number. An invalid object leaves the saved position unchanged. This intrinsic is absent from the SI beta table.
