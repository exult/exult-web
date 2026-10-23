Looks through the party's possessions and deletes a specified amount of objects matching a given search criteria. This function is an all-or-nothing function: it will delete all requested objects or none at all if it found less objects than the amount that was requested for deletion.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `count` | The amount of objects to be deleted. Can be `QUANTITY_ANY = -359` to delete all objects that match the criteria. |
| `shape` | The shape we are looking for. |
| `qual` | The quality that is being sought. Can be `QUALITY_ANY = -359` to match any quality. |
| `frame` | What frame is desired. Can be `FRAME_ANY = -359` to match any frame. |
| `unk` | Flag of unknown meaning. This parameter is ignored by Exult, and can be omitted. |

#### Return

`true` if 'count' objects were found and deleted, `false` if no objects were deleted.
