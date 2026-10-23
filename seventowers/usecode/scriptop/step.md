```usecode
step dir
```

Immediately executes a second script command. Causes the actor (which must be an NPC, monster or barge) to move one tile in the direction specified by 'dir'. Valid values for 'dir' are:

| NORTH | = 0 | NORTHEAST | = 1 | EAST | = 2 | SOUTHEAST | = 3 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SOUTH | = 4 | SOUTHWEST | = 5 | WEST | = 6 | NORTHWEST | = 7 |

Additionally, Usecode C recognizes the following constants:

| `north` | `ne` | `east` | `se` | `south` | `sw` | `west` | `nw` |
| --- | --- | --- | --- | --- | --- | --- | --- |
