Performs a contest between two supplied values.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `att` | What should be added to the die roll, improving the chances of success. |
| `def` | What should be subtracted from the die roll, reducing the chances of success. |

#### Return

The contest is a roll of a 30-sided die: if the die comes up 30, the return is `true`; if it comes up 1, the return is `false`. For all other values, the attack value is added to the die roll and the defense value is subtracted from the same roll. If the result is 15 or more, the attacker wins and the return is `true`; otherwise, the attacker loses and the return is `false`.
