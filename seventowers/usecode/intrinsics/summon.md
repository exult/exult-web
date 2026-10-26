Creates a monster of the supplied shape. This monster has equipment as defined in its equipment record, starts with an `IN_COMBAT` schedule, and inherits `item`'s effective alignment when `item` is an NPC outside the party. If `item` is a party member or is not an NPC, the summoned monster's alignment is `GOOD`. The monster will be placed within five tiles of the avatar.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `shape` | The shape in 'SHAPES.VGA' to be used for the summoned monster. It **must** have a 'monster' tab in Exult Studio. |
| `unk` | A flag of unknown meaning. Exult ignores this flag, and it is safe to omit it. |

#### Return

Zero if there is no free tile near the avatar or the specified shape is not a valid monster shape; an object reference to the summoned monster otherwise.
