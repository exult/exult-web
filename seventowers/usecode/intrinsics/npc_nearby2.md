Finds out if the desired object is nearby. In this context, 'nearby' means fewer than 40 tiles from the avatar. Note that, despite the name, this intrinsic is valid for all objects, not just NPCs.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object to be checked. |

#### Return

`true` if the object is valid and fewer than 40 tiles from the avatar, `false` otherwise. Sleeping, paralysis, or death do not affect this test.
