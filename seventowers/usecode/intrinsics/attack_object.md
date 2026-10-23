Causes a NPC to attack the object with a given weapon. This intrinsic does not animate the NPC in any way; it only emulates a hit with the selected weapon.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `attacker` | Who is attacking. |
| `target` | What is being attacked. Must be an object or NPC. |
| `weapon` | What shape in 'SHAPES.VGA' to use as the source of the weapon information in the attack, or -1 for an unarmed attack. If this is a missile or thrown weapon, it will consume the appropriate ammunition (if any) and fire the correct projectile. |

If the NPC is targeting a tile, the attack will only be meaningful if the weapon causes an explosion.

#### Return

`true` if a melee attack hits or if a ranged attack fires its projectile; returns `false` if the melee attack missed or if the attack could not be realized for any reason (including an invalid attacker, an invalid target, being out of range, lack of adequate ammunition for the given weapon) if attacking a valid target with a valid weapon, `false` otherwise.
