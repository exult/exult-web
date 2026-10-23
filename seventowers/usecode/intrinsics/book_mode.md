Displays a book or scroll on screen. Text in the book or scroll is supplied through normal conversation methods.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose shape is to be used to determine what shape from 'GUMPS.VGA' is to be shown. This association is currently hard-coded (as of 2009/02/27): if the shape of the supplied object is equal to 797, a scroll gump will be displayed; otherwise, a book gump will be displayed. |

> **SI SPECIFIC**
>
> There is one additional shape which displays a scroll gump: shape 707. This shape, and shape 705 (serpentine book), will both display text using serpentine characters; if the avatar's 'READ' flag is set, any serpentine runes will be translated into normal runes.
