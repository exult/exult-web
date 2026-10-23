Makes a NPC approach the avatar at fairly high speed.

**Warning:** If the NPC is initially at more than 10 tiles from the avatar, Exult will let him/her walk for about 1/5 seconds before returning, effectively halting the game in the mean time.

**NOTICE:** In the original, this intrinsic **seems:** to create the NPC off-screen, while it approaches the avatar due to si_path_run_usecode or the 'TALK' schedule. This requires further investigation; this means that **this intrinsic is subject to change**.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | Who should approach the avatar. |
| `unk1` | Unknown parameter from the original. Exult does not use this parameter, but **this is subject to change**. Ignore this parameter at your own peril. |
| `unk2` | Unknown parameter from the original. Exult does not use this parameter, but **this is subject to change**. Ignore this parameter at your own peril. |

#### Return

`false` if the NPC is dead or cannot reach the avatar, `true` otherwise.
