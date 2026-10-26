Gets the current location of the desired object.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose position is desired. |

#### Return

An array containing the (x, y, z) position of the object.

For an object inside a container, this is the position of its outermost container. Animated objects use their original tile coordinates, so animation offsets do not change the result. An invalid object returns `[0, 0, 0]`.
