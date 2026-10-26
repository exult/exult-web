Creates a specified amount of objects matching the given parameters and gives them all to the party. Not all objects requested may be created; in particular, this intrinsic is guaranteed to create only as many of the requested objects as the party can hold.

> **SI SPECIFIC**
>
> If the party cannot hold all requested objects, the remaining objects are created and then placed in the ground nearby.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `count` | The amount of objects to be created. |
| `shape` | The shape in 'SHAPES.VGA' that should be used for the created objects. |
| `qual` | The quality of the objects being created. Can be `QUALITY_ANY = -359` to create items of any quality. |
| `frame` | What frame will be used for the created objects. Can be `FRAME_ANY = -359` to create items of any frame. |
| `temp` | Optional flag, default `false`, indicating whether the created items are temporary or not. |

#### Return

Returns an array of object references for all party members that received any of the created objects.

> **BG SPECIFIC**
>
> The 'temp' flag applies to all objects created by this function.

> **SI SPECIFIC**
>
> If any objects were added to the ground, the number of objects on the ground is appended to the end of the return array. The 'temp' flag applies only to those objects that were added to the floor.
