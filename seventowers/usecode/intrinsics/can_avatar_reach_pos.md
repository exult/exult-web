Checks if the avatar can walk from its present location to a specified position. This is similar to, but more limited than, the `is_dest_reachable` Exult intrinsic.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `pos` | Where we want check if the avatar can go. Must have at least two elements; if it has exactly two elements, Exult will assume the z coordinate of the destination to be zero. |

#### Return

`false` if the supplied position is invalid or if the avatar cannot reach the supplied destination, `true` otherwise.

A negative `z` or a position with fewer than two elements returns `false`. The path test accepts reaching within one tile of the destination, rather than requiring the exact tile.
