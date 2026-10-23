Counts all objects matching a given search criteria that are contained in the supplied object.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose contents are to be searched. Can be a container, an NPC or `PARTY = -357` to search the whole party. |
| `shape` | The shape we are looking for. Can be `SHAPE_ANY = -359` to match any shape. |
| `qual` | The quality that is being sought. Can be `QUALITY_ANY = -359` to match any quality. |
| `frame` | What frame is desired. Can be `FRAME_ANY = -359` to match any frame. |

#### Return

The number of objects that match the given criteria.
