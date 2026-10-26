Displays a face onscreen for conversations. The face is a shape from 'FACES.VGA'. This intrinsic always uses slot 1 for the new face.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `face` | The face to be displayed. May be an integer or an NPC. |
| `frnum` | The frame number of the face to be displayed. |

If '`face`' is an integer, the shape to be displayed is the absolute value of this number. If this value is `0` or `356`, the avatar's face will be displayed, using the correct face for the avatar's skin and `PETRA` status flag.

If '`face`' is an NPC, the Exult Studio-set face for that NPC is displayed; the "default" face is equal to the NPC's number.

Use Usecode C's `face.show@1(frnum)` statement in place of this intrinsic. The frame argument is optional: `face.show@1()` is equivalent to `face.show@1(0)`. The receiver may be either a face number or an NPC.

When `frnum` is zero, `npc.say@1("@Text.@")` displays the NPC's face in slot 1 and the supplied text. Use `npc.say@1()` to display text previously set with `message`.
