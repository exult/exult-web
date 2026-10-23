Sets the text content of a text field widget within a dynamic gump.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `item` | The object whose dynamic gump contains the text field. |
| `field_id` | The numeric identifier of the text field widget to update. |
| `text` | The string to display in the text field. |

#### Return

Returns 1 on success, 0 on failure (e.g. if the gump is not found or the field does not exist).

#### Notes

The gump is located by searching for the gump associated with `item`, with a fallback to `item`'s owner. Returns 0 if the text string is null.
