Makes the supplied NPC target the desired object. This does not make the NPC attack unless his schedule is `IN_COMBAT`. This intrinsic will reevaluate if the NPC's oppressor is actually attacking him, and will invalidate the oppressor if not.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose opponent we wish to set. |
| `obj` | What the target should be set to. If the target is an NPC, his/her oppressor will be set to the attacking NPC. |
