Finds the first object matching the search criteria.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `cont` | The object or location to be searched. Can be a container or NPC, a (x, y, z) location, `PARTY = -357` to search the whole party or `FIND_ON_SCREEN = -359` to search a square region around the screen location with size given by the screen's height. |
| `shape` | The shape we are looking for. |
| `qual` | The quality that is being sought. Can be `QUALITY_ANY = -359` to match any quality. |
| `frame` | What frame is desired. Can be `FRAME_ANY = -359` to match any frame. |

> **IMPORTANT NOTES**
>
> When 'cont' is a position, the search is made in a 1-tile-wide region centered on the given position.
> 
> Also, if the search is **not** being done in a container or NPC, 'shape' can be `SHAPE_ANY = -359` to match any shape.

#### Return

An object reference to the first found object, or zero if no objects match the given criteria.
