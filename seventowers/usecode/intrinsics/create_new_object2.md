Creates a new object with the specified shape and places it in the game world at the supplied location.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `shape` | The shape in 'SHAPES.VGA' of the new object. If this is a monster shape, the object is created with all equipment specified by the shape's equipment entry. |
| `pos` | The location where the new object is to be placed. |
| `frame` | Optional frame number for the object. If omitted or negative, preserves the frame selected during creation. |

The location can be specified by arrays ranging from 1 to 4 components. The meaning of these components is as follows:

- 1 element: the object will be deleted (equivalent to '`remove_item`' intrinsic);
- 2 elements: mean a (x, y) location. The object is placed at z = 0 in the current game map;
- 3 elements: mean a (x, y, z) location. The object is placed in the current game map;
- 4 elements: mean a (x, y, z, map) location. The object is placed in the specified map unless it is -1, in which case it will be placed in the current game map.

#### Return

An object reference to the newly created object. This object is placed in the game world exactly as if `UI_update_last_created(pos)` had been called, and hence will **not** be in the 'last created' stack.
