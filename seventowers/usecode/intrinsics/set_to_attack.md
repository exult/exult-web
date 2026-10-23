Schedules a NPC to attack the object with a given weapon. This intrinsic does not animate the NPC in any way; the scheduled attack only emulates the actual hit with the selected weapon. The actual attack is triggered by a script; in an Usecode C script, use the '`attack`' command to actually perform the attack.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `attacker` | Who is attacking. |
| `target` | What is being attacked. Can be an object, NPC, or the return of a `click_on_item` intrinsic call, even if a tile has been clicked. |
| `weapon` | What shape in 'SHAPES.VGA' to use as the source of the weapon information in the attack. It **must** specify a shape that has a 'weapon' tab in Exult Studio, or nothing will happen. |

If the NPC is targeting a tile, the attack will only be meaningful if the weapon causes an explosion.

#### Return

`true` if attacking a valid target with a valid weapon, `false` otherwise.
