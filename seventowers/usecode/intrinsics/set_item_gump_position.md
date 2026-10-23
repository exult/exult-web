Programmatically repositions an item within its container gump to specific coordinates. This allows usecode to arrange items in precise positions for rituals, puzzles, or custom container layouts.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `item` | The item object to reposition. |
| `x` | The horizontal coordinate within the container's display area. |
| `y` | The vertical coordinate within the container's display area. |

#### Return

Returns `1` on success, `0` on failure. Failure occurs if the item is invalid, not in a container, the container gump is not open, or if negative coordinates are provided.

#### Notes

Coordinates must be non-negative. The positioning is relative to the container's display area. After setting a position, the display is automatically refreshed to show the new arrangement.
