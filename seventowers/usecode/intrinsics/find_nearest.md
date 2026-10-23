Searches the area around a given object looking for other objects of a specified type.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object around which the search will happen. |
| `shape` | The shape we are looking for. Can be `SHAPE_ANY = -359` to match any shape. |
| `dist` | The maximum distance from 'obj' that will be considered in the search. |

#### Return

An object reference to the nearest object found given the search criteria. You cannot find eggs, barges, invisible or transparent objects with this intrinsic.
