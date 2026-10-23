Searches a specified area looking for objects matching a given criteria.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `loc` | The center of the area to be searched. Can be the return of a '`UI_click_on_item`' intrinsic call, an object reference, a (x, y, z) position vector or a (x, y, z, quality, frame) vector. For the last form, quality can be `QUALITY_ANY = -359` and frame can be `FRAME_ANY = -359` (but there is little point in both being wildcards, as this is the default behavior). |
| `shape` | The shape we are looking for. Can be `SHAPE_ANY = -359` to match any shape. |
| `dist` | Radius (in tiles) of the area to be searched. |
| `mask` | Parameter specifying the classes of objects that can be found. |

The mask value controls what can be found; using the proper mask, you can find eggs, barges, invisible or transparent objects with this intrinsic. The mask can be the combination (sum) of one or more of the following values:

| Parameter / value | Description |
| --- | --- |
| MASK_NONE = 0x00 | Cannot find eggs, barges, invisible or transparent objects. |
| MASK_NPC = 0x04 | Restricts the search to NPCs, alive or dead. Ignored if a non-wildcard shape is given. |
| MASK_NPC2 = 0x08 | Restricts the search to living NPCs. |
| MASK_EGG = 0x10 | Allows eggs and barges to be found. |
| MASK_INVISIBLE = 0x20 | Allows invisible objects that are not in the avatar's party to be found. |
| MASK_PARTY_INVISIBLE = 0x40 | Allows invisible party members to be found |
| MASK_TRANSLUCENT = 0x80 | Allows translucent objects to be found |

#### Return

Array containing all objects of matching the given criteria that are located in the specified area. This array is sorted from right to left, closest first.
