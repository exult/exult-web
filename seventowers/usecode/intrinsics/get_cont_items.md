Looks for all objects matching a given search criteria that are contained in the supplied object.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose contents are to be searched. Can be a container or an NPC. |
| `shape` | The shape we are looking for. Can be `SHAPE_ANY = -359` to match any shape. |
| `qual` | The quality that is being sought. Can be `QUALITY_ANY = -359` to match any quality. |
| `frame` | What frame is desired. Can be `FRAME_ANY = -359` to match any frame. |

#### Return

Array containing object references to all objects that match the given criteria.
