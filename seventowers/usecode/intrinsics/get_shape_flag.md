Tests one of Exult's shape information flags for an object, shape number, or map tile.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `target` | The object, NPC, shape number, or tile position to inspect. Tile positions may be passed as `[x, y]`, `[x, y, z]`, or a `click_on_item`-style `[object, x, y, z]` array. Coordinate targets check both the flat tile and any non-flat object whose footprint covers that tile coordinate. |
| `flag` | The shape flag ID to test. Values outside the valid range return `false`. |

#### Return

`true` if the target's shape has the requested flag, or `false` if it does not, the target is invalid, or the flag ID is out of range.

#### Flag IDs

| ID | Flag |
| --- | --- |
| 0 | SFX |
| 1 | strange movement |
| 2 | contact effect |
| 3 | water |
| 4 | fire field |
| 5 | sleep field |
| 6 | poison field |
| 7 | caltrops field |
| 8 | campfire field |
| 9 | any field type |
| 10 | animated |
| 11 | solid |
| 12 | transparent |
| 13 | translucent |
| 14 | occludes |
| 15 | light source |
| 16 | x obstacle |
| 17 | y obstacle |
| 18 | door |
| 19 | barge part |
| 20 | container locked |
| 21 | extradimensional storage |
| 22 | quantity frames |
| 23 | usecode events |
| 24 | explosive |
| 25 | on fire |
| 26 | lightweight |
| 27 | body |
| 28 | jawbone |
| 29 | mirror |
| 30 | spell |

#### Notes

When `target` is a tile position, Exult checks the flat at that tile and also checks object shapes occupying the tile. For `[x, y, z]` targets, the `z` value is used when matching object footprints; flat tile checks use the `x` and `y` coordinates.

A four-element array first tries the object in element 0. If that is not a valid item, Exult falls back to elements 1, 2, and 3 as `x`, `y`, and `z` and performs the same flat-tile and object-footprint checks.

This lets scripts test semantic shape flags such as `on fire`, `water`, `solid`, or `contact effect` at a map coordinate without maintaining hard-coded shape number lists.
