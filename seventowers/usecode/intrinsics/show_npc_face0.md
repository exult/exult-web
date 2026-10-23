Displays a face onscreen for conversations. The face is a shape from 'FACES.VGA'. This intrinsic always uses slot 0 for the new face.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `face` | The face to be displayed. May be an integer or an NPC. |
| `frnum` | The frame number of the face to be displayed. |

If '`face`' is an integer, the shape to be displayed is the absolute value of this number. If this value is `0` or `356`, the avatar's face will be displayed, using the correct face for the avatar's skin and `PETRA` status flag.

If '`face`' is an NPC, the Exult Studio-set face for that NPC is displayed; the "default" face is equal to the NPC's number.

For the cases when '`frnum` is zero, you should use Usecode C's '`npc.say()`' to display the NPC's face and display any text within the parenthesis (or set with '`message`') too.
