Searches the area around the avatar looking for other objects of the specified shape.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `shape` | The shape we are looking for. Can be `SHAPE_ANY = -359` to match any shape. |

#### Return

Array containing all objects of the given shape that are located within 192 tiles of the avatar. This array is sorted from right to left, closest first. You cannot find eggs, barges, invisible or transparent objects with this intrinsic.
