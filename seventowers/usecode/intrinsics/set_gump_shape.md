Sets the shape and frame of a shape widget within a dynamic gump.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `item` | The object whose dynamic gump contains the shape widget. |
| `field_id` | The numeric identifier of the shape widget to update. |
| `shape` | The shape number from shapes.vga to display. |
| `frame` | The frame number of the shape to display. |

#### Return

Returns 1 on success, 0 on failure (e.g. if the gump is not found or the field does not exist).

#### Notes

The gump is located by searching for the gump associated with `item`, with a fallback to `item`'s owner.
