Returns the current value of a slider widget within a dynamic gump.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `item` | The object whose dynamic gump contains the slider widget. |
| `field_id` | The numeric identifier of the slider widget to read. |

#### Return

The current slider value, or 0 on failure (e.g. if the gump is not found or the field does not exist).

Exult first looks for an open gump belonging to `item`, then tries its immediate owner's gump. It uses the first slider widget whose field ID matches; an invalid item, missing gump, or missing slider returns `0`.
