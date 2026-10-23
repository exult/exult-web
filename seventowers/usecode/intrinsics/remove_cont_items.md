Removes 'count' objects with shape 'shape', quality 'qual' and frame 'frame' that are contained by 'obj'. 'unk' is an unknown flag which is ignored by Exult; I **think** it is safe to omit it from the parameter list, but I am not sure. 'qual' and 'frame' can be wildcards:

| qual | frame |
| --- | --- |
| QUALITY_ANY    = -359 | FRAME_ANY      = -359 |

Return value is the number of objects actually removed.

Looks through the contents of a container and deletes a specified amount of objects matching a given search criteria.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose contents are to be searched. Can be a container, an NPC or `PARTY = -357` to search the whole party. |
| `count` | The amount of objects to be deleted. Can be `QUANTITY_ANY = -359` to delete all objects that match the criteria. |
| `shape` | The shape we are looking for. |
| `qual` | The quality that is being sought. Can be `QUALITY_ANY = -359` to match any quality. |
| `frame` | What frame is desired. Can be `FRAME_ANY = -359` to match any frame. |
| `unk` | Flag of unknown meaning. This parameter is ignored by Exult, and can be omitted. |

#### Return

The number of objects actually removed.
