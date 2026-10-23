Pops the last object pushed in the 'last created' stack and places it in the game map at the supplied position.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `pos` | The location where the new object is to be placed. |

The location can be specified by arrays ranging from 1 to 4 components. The meaning of these components is as follows:

- 1 element: the object will be deleted (equivalent to '`remove_item`' intrinsic). The original usecode generally passed '`-358`' for this parameter, but this is likely just by convention as any value works.
- 2 elements: mean a (x, y) location. In Exult, the object is placed at `z = 0` in the current game map; in the original games, nothing is done and the update fails.
- 3 elements: mean a (x, y, z) location. The object is placed in the current game map. In Exult, this always succeeds; it could fail in the original games.
- 4 elements: mean a (x, y, z, map) location. Exult-only. The object is placed in the specified map unless it is -1, in which case it will be placed in the current game map.

#### Return

For the 1-element version, `false` if the 'last created' stack is empty or `true` if the object was deleted. Otherwise, returns `true` if object was successfully placed on the map, `false` otherwise.

> **NOTES ABOUT ORIGINAL GAMES**
>
> In the original games, the function could fail to place the item in the map. In this case, it would try to delete an unrelated on-screen object flagged with the TEMPORARY flag to make room for the updated object and retry. The retry could fail again, in which case the update fails; otherwise, it would succeed. This means that, on occasion, using this function could cause objects to be deleted in the original.
