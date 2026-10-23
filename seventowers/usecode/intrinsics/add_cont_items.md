Create a number of objects inside a container.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The container or NPC that will receive the created objects. |
| `count` | The amount of objects to be created. |
| `shape` | The shape in 'SHAPES.VGA' that should be used for the created objects. |
| `qual` | The quality of the objects being created. Can be `QUALITY_ANY = -359` to create items of any quality. |
| `frame` | What frame will be used for the created objects. Can be `FRAME_ANY = -359` to create items of any frame. |
| `temp` | Flag indicating whether the created items are temporary or not. |

#### Return

How many objects were actually added to the container.
