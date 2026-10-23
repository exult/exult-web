Causes a fixed amount of damage of the specified type to a target. This intrinsic ignores armor and armor-granted immunities.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object to be damaged. |
| `hits` | How much damage is to be caused. |
| `type` | The type of the damage. If the target is immune to this damage type, he will take no damage from this intrinsic; conversely, a monster vulnerable to this type of damage takes doubled damage. Armor-granted immunities are ignored. |

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
