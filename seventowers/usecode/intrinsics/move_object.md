Moves the specified object to a new location in the game world. This move is instantaneous, and is often used for teleportation in the original usecode.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object to be moved. Can be `PARTY = -357` to teleport the entire party. |
| `pos` | The object's new location. Can be a (x, y) position, a (x, y, z) position or a (x, y, z, map) position. If no z coordinate is specified, it is assumed to be zero. If no map is specified, or if it is set to a negative number, the avatar's map will be used instead. |
| `flag` | Optional, default `false`. When `obj` is `PARTY`, set to `true` to include paralyzed or sleeping party members in the teleport. Ignored for an individual object. |

If the avatar (or the party) is being teleported, the view will center in the new location and nearby eggs will be activated normally.
