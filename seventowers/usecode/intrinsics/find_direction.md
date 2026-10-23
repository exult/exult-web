Get the direction from one location or object to another.

This intrinsic is aliased under the name '`direction_from`'; they are both equivalent in Exult.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `param1` | The object or location **from** which we want the direction. |
| `param2` | The object or location **to** which we want the direction. |

Both parameters can be objects, arrays with 3 components or arrays with 4 components. Depending on what they are, Exult will treat them differently and expect them to conform to a certain format; specifically:

| Parameter / value | Description |
| --- | --- |
| Type | Interpretation/Format |
| `object` | The parameter is an object or NPC. |
| `int [3]` | The parameter is a (x, y, z) position, such as the return of a `UI_get_object_position` intrinsic call. |
| `mixed [4]` | The parameter is of the form (object, x, y, z), such as the return of a call to `UI_click_on_item` intrinsic. |

#### Return

The 8-cardinal-point direction of an arrow starting in the first parameter and pointing to the second parameter. It can be one of the following values:

| NORTH | = 0 | NORTHEAST | = 1 | EAST | = 2 | SOUTHEAST | = 3 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SOUTH | = 4 | SOUTHWEST | = 5 | WEST | = 6 | NORTHWEST | = 7 |
