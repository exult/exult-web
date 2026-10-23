Gives the last item in the 'last created' stack to the specified container or NPC. This intrinsic ignores volume, and is quite likely to succeed; the given object is popped from the 'last created' stack only if the intrinsic succeeds.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | Container or NPC that will gain the object. |

#### Return

`true` if successful, `false` otherwise.
