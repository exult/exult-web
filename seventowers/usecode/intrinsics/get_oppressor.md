Gets whoever is attacking the supplied NPC. This oppressor can be set through usecode, but it is also automatically set to whomever has last attacked (caused damage to) the supplied NPC. It is also set whenever an NPC acquires a new target -- this NPC will be set as its target's oppressor.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC whose oppressor is desired. |

#### Return

Returns the NPC number of the supplied NPC's oppressor, or zero if no valid NPC was supplied. Ordinary NPC numbers are positive here, unlike `UI_get_npc_number`. The avatar is represented by zero, rather than -356.
