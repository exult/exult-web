Gets a list of all dead party members near a given object.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object around which dead bodies will be searched. |

#### Return

An array with one element per recorded dead party member. Each element contains the body reference if the body exists and is fewer than 50 tiles from `obj`; otherwise, that element remains zero. The result is an empty array when there are no recorded dead party members. An invalid `obj` produces no meaningful return value.
