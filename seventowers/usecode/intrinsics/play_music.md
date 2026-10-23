Plays the specified song.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `track` | The track number to be played or 255 (0xFF) to **stop** any music that is playing. |
| `obj` | The source of the music, or zero for 'unattached' music. Positive numbers are **not** interpreted as NPCs! |

If supplied with a valid object or NPC that is on the game world, this intrinsic will also display the sprite effect # 24 (musical notes).
