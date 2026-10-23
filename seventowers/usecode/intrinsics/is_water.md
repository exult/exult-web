Determines if a given tile or object is a water tile.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `param` | The object or location to be tested. |

The parameter can be an object, an array with 2 components, an array with 3 components, or an array with 4 components. The interpretation of the parameter is as follows:

| Parameter / value | Description |
| --- | --- |
| Type | Interpretation/Format |
| `object` | Exult specific: The parameter is an object or NPC, whose shape is tested for the water flag. |
| `int [2]` | The parameter is a (x, y) position specifying a tile to be tested. |
| `int [3]` | The parameter is a (x, y, z) position, such as the return of a `UI_get_object_position` intrinsic call. Of this position, (x, y) specifies a tile to be tested. |
| `mixed [4]` | Exult specific: The parameter is of the form (object, x, y, z), such as the return of a call to `UI_click_on_item` intrinsic. If object is not null, it's shape is tested for the water flag. Otherwise, (x, y) is used to find and test the corresponding tile. |

#### Return

`true` if the specified tile or object is a water tile, `false` otherwise.
