Creates a new object with the specified shape.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `shape` | The shape in 'SHAPES.VGA' of the new object. If this is a monster shape, the object is created without any equipment whatsoever, even if the shape has an associated equipment entry. |

#### Return

An object reference to the newly created object. This object is pushed into the 'last created' LIFO stack, and starts out in 'limbo'; it will remain there until placed either, in the game world through the '`UI_update_last_created`' intrinsic or inside a container through the '`UI_give_last_created`' intrinsic.
