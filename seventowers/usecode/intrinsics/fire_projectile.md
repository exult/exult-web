Causes the given object to fire a high-speed missile in the supplied direction.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object that will fire the projectile. |
| `dir` | Numeric value indicating the direction in which the projectile will be fired. |
| `proj` | The shape in 'SHAPES.VGA' of the projectile to be fired. |
| `attpts` | Numeric value determining the likelihood that the missile will hit. Works like the 'att' parameter in the `roll_to_win` intrinsic in a contest against the target's `COMBAT` property. |
| `weapon` | The shape in 'SHAPES.VGA' whose weapon information will be used when the missile hits. |
| `ammo` | The shape in 'SHAPES.VGA' whose ammunition information will be used when the missile hits. |

The direction into which the projectile is filed is the 8-cardinal-point direction in which the projectile will travel. It can be one of the following values:

| NORTH | = 0 | NORTHEAST | = 1 | EAST | = 2 | SOUTHEAST | = 3 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SOUTH | = 4 | SOUTHWEST | = 5 | WEST | = 6 | NORTHWEST | = 7 |
