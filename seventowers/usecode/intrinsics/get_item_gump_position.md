Returns the coordinates of an item within its currently open container gump. This allows usecode to inspect where items are positioned in the container's display area.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `item` | The item object whose position is desired. |

#### Return

An array `[x, y]` containing the item's coordinates within the container gump if the item is valid, currently in a container, and the container gump is open. Returns an empty array otherwise.

#### Notes

The returned coordinates are relative to the container's display area, not the screen. This intrinsic is useful for checking item placement in custom container systems or ritual-based gameplay mechanics.
