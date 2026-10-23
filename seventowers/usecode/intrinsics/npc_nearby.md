Finds out if the desired object is on screen and can act. An NPC is considered able to act if it is not asleep, paralyzed or dead; other objects are always considered able to act. Note that, despite the name, this intrinsic can also be used for objects.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object or NPC to be checked. |

#### Return

`true` if the object is in the screen and can act, `false` otherwise or if the supplied parameter is not an object or NPC.
