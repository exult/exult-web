Deprecated; use Usecode C's '`npc.hide()`' statement instead. Hides the specified face if it is being shown.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `face` | The face to be hidden. May be an integer or an NPC. |

If '`face`' is an integer, the shape to be hidden is the absolute value of this number. If this value is `0` or `356`, the avatar's face will be hidden.

If '`face`' is an NPC, the Exult Studio-set face for that NPC is hidden; the "default" face is equal to the NPC's number.
