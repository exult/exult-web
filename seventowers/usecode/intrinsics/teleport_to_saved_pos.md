Teleports the avatar and party to the last saved position. Note that only the last position stored by the `UI_save_pos` intrinsic is available.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | If this is not the avatar, nothing happens. Otherwise, the party is teleported to the stored position. |
| `flag` | This optional parameter controls whether avatar or party members that are paralyzed or asleep are teleported; if `true`, these members will be teleported, otherwise, they won't; defaults to `false`. |
