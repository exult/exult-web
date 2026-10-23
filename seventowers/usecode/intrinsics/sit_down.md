Causes the specified NPC to sit on the given chair. 'npc' sit on 'obj'. 'obj' must be a chair/seat shape (currently, hardcoded to 873/292). For barge seats, also runs the barge usecode when everyone in the party is seated.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC that is going to sit down. |
| `obj` | The chair that should be sat upon. |

 If the chair is shape 292 (a barge seat), if there is a barge containing the chair and if all party members are sitting, then Exult will run the barge's usecode (function 0x634).
