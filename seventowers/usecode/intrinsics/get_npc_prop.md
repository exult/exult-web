Gets the current value of an object's or NPC's property. Despite the name, this intrinsic can also be called for any object, although most properties will be unavailable for anything but NPCs.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object or NPC whose property is desired. |
| `prop` | String or integer specifying the property to be inspected. |

If the desired property has been specified as an integer, it must be in the range from 0 to 11. It can be one of the following values:

| STRENGTH | = 0 | DEXTERITY | = 1 | INTELLIGENCE | = 2 |
| --- | --- | --- | --- | --- | --- |
| HEALTH | = 3 | COMBAT | = 4 | MANA | = 5 |
| MAX_MANA | = 6 | TRAINING | = 7 | EXPERIENCE | = 8 |
| FOODLEVEL | = 9 | SEX_FLAG | = 10 | MISSILE_WEAPON | = 11 |

#### Return

Returns the current value of the specified property. The following properties are special cases:

| Parameter / value | Description |
| --- | --- |
| `HEALTH` | This is the only meaningful property for non-NPC objects. Returns the current remaining hit points of the object or NPC. |
| `SEX_FLAG` | The return is `true` if the NPC is female, `false` otherwise. |
| `MISSILE_WEAPON` | The return is `true` if the NPC is using a missile weapon or a good thrown weapon (such as a spear), `false` otherwise. |

This intrinsic returns zero for any property which is not meaningful for the supplied object; this includes string properties that have not been previously set with a `UI_set_npc_prop` intrinsic call.

> **BG SPECIFIC**
>
> Standard BG does not have sex data for anyone but the avatar, so the return is almost always 'false'. This is not a limitation of the engine or of Exult, just a statement about the game data.
