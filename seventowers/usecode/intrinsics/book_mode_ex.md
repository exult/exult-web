Displays a book or scroll on screen. Text in the book or scroll is supplied through normal conversation methods.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `is_scroll` | Flag determining whether to display a scroll (`true`) or a book gump (`false`). This determines the area occupied by the text, and will determine what shape from 'GUMPS.VGA' to display if none is specified. |
| `font` | Integer that determines what shape from 'FONTS.VGA' will be used to render the text. |
| `gump` | Numerical value determining what shape from 'GUMPS.VGA' will be used. The text area is not affected by this parameter. Optional; if omitted or `-1`, uses the standard book or scroll shape. |

> **IMPORTANT NOTES**
>
> Unlike the '`UI_book_mode`' intrinsic, this intrinsic performs **no** translation of any kind if the avatar's 'READ' flag is set. This is an intentional design feature -- for example, text written in Gargish and being displayed in a Gargish font should be translated by more than a mere font substitution. Also, the gump shapes should be 'compatible' with the standard book/scroll shapes as Exult will write the text in the same region of the screen as it does for standard books/scrolls.
