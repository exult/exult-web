Displays a face onscreen for conversations. The face is a shape from 'FACES.VGA'. This intrinsic finds a free slot to display the face in or uses the second slot if there are no free slots.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `face` | The face to be displayed. May be an integer or an NPC. |
| `frnum` | The frame number of the face to be displayed. |

If '`face`' is an integer, the shape to be displayed is the absolute value of this number. If this value is `0` or `356`, the avatar's face will be displayed, using the correct face for the avatar's skin and `PETRA` status flag.

If '`face`' is an NPC, the Exult Studio-set face for that NPC is displayed; the "default" face is equal to the NPC's number.

Use Usecode C's `face.show(frnum)` statement in place of this intrinsic. The frame argument is optional: `face.show()` is equivalent to `face.show(0)`. The receiver may be either a face number or an NPC.

When `frnum` is zero, `npc.say("@Text.@")` displays the NPC's face and the supplied text. Use `npc.say()` to display text previously set with `message`.
