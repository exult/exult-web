Tests the water shape flag of a flat map tile or of the object in a four-element click result.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `param` | The object or location to be tested. |

The parameter must be an array with 2, 3, or 4 components. The interpretation of the parameter is as follows:

| Parameter / value | Description |
| --- | --- |
| Type | Interpretation/Format |
| `int [2]` | The parameter is a (x, y) position specifying a tile to be tested. |
| `int [3]` | The parameter is a (x, y, z) position, such as the return of a `UI_get_object_position` intrinsic call. Of this position, (x, y) specifies a tile to be tested. |
| `mixed [4]` | Exult specific: The parameter is of the form (object, x, y, z), such as the return of a call to `UI_click_on_item` intrinsic. If the first element resolves to an object, its shape is tested for the water flag. Otherwise, (x, y) is used to find and test the corresponding tile. |

#### Return

`true` if the specified tile or object is a water tile, `false` otherwise.

The `z` coordinate is ignored when testing the flat map tile. A direct object reference is not accepted by this implementation; pass `[obj, x, y, z]` or use `UI_get_shape_flag(obj, 3)` instead. Invalid inputs return `false`.
