Sets the current value of a slider widget within a dynamic gump.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `item` | The object whose dynamic gump contains the slider widget. |
| `field_id` | The numeric identifier of the slider widget to update. |
| `value` | The value to set on the slider. |

#### Return

Returns 1 on success, 0 on failure (e.g. if the gump is not found or the field does not exist).

#### Notes

The value is clamped to the slider's configured minimum and maximum range.
