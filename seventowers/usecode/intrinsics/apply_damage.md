Causes random damage of a given type to the desired object, subject to armor.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `base` | The 'strength' of the attack; only one third of this value (rounded down) is used to deal damage. This parameter is ignored depending on damage type; specifically, damage of `LIGHTNING_DAMAGE` type ignores this parameter. |
| `hits` | The 'weapon points' of the attack. If this parameter is equal to 127 or more, this intrinsic will ignore all armor and deal a fixed 127 points of damage of the specified type, ignoring the 'base' parameter. |
| `type` | The type of the damage. If the target is immune to this damage type, he will take no damage from this intrinsic; conversely, a monster vulnerable to this type of damage takes doubled damage. Armor-granted immunities also protect the target from the effects of this intrinsic. If the damage type is `LIGHTNING_DAMAGE`, `ETHEREAL_DAMAGE` or `SONIC_DAMAGE`, this intrinsic will ignore armor. |
| `obj` | The object to be damaged. |

The type of the damage is a numerical value that describes what kind of damage should be caused. It can be one of the following values:

| Parameter / value | Description |
| --- | --- |
| NORMAL_DAMAGE = 0 | Normal damage. |
| FIRE_DAMAGE = 1 | Damage from heat sources. |
| MAGIC_DAMAGE = 2 | Damage from a magical source. |
| LIGHTNING_DAMAGE = 3 | Damage from electrical sources such as lightning. Extremely painful, even a single point of damage causes the screen to flash a red color. This damage ignores all armor and does not depend on the attacker's strength. |
| POISON_DAMAGE = 3 | Damage from poison. Extremely painful, even a single point of damage causes the screen to flash a red color. This damage ignores all armor and does not depend on the attacker's strength. |
| STARVATION_DAMAGE = 3 | Damage from starvation. Extremely painful, even a single point of damage causes the screen to flash a red color. This damage ignores all armor and does not depend on the attacker's strength. |
| FREEZING_DAMAGE = 3 | Damage from frostbite. Extremely painful, even a single point of damage causes the screen to flash a red color. This damage ignores all armor and does not depend on the attacker's strength. |
| ETHEREAL_DAMAGE = 4 | Special magical damage, basically magic damage not blocked by normal magic resistance or armor. |
| SONIC_DAMAGE = 5 | Sound-based damage. This damage type ignores armor. |

The damage is calculated from a series of generated random numbers. It proceeds along the following steps:

- If the target is wearing any armor that makes him/her immune to the specified damage type, he takes no damage from this intrinsic.
- If hits is 127 or more, 127 points of damage are caused to the target. This case ignores all armor.
- If base/3 (rounded down) is zero, it does not affect damage; likewise, if hits is zero, it does not affect damage. A random number will be generated for each of them that are nonzero, ranging from 1 to base/3 or from 1 to hits, as appropriate. These two random numbers are added together.
- If the damage type does not ignore armor, the armor value of everything worn by the target is computed. Monster-specified armor values are also added to this value. If the total armor is at least zero, a random number in the range 1 to (total armor) is generated and subtracted from the damage total above.
- If the target has immunities granted by his monster data, he will take no damage; if he has any vulnerabilities, the remaining damage, if positive, will be doubled.

#### Return

Returns `true` if any damage is caused on a valid target, `false` otherwise.
