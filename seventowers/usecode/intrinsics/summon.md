Creates a monster with shape 'shape'. The created monster has equipment as defined in its equipment record, and has a 'GOOD' alignment. If the creation is successful, the return value is a reference to the monster; otherwise, the return is '0'. In the originals, there was an additional '`bool`' parameter, but it is unimplemented in Exult.

Creates a monster of the supplied shape. This monster has equipment as defined in its equipment record, starts with an `IN_COMBAT` schedule, and will have the same alignment as `item`; for the cases in which `item` is not an NPC, the summoned monster's alignment will be `GOOD` instead. The monster will be placed within five tiles of the avatar.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `shape` | The shape in 'SHAPES.VGA' to be used for the summoned monster. It **must** have a 'monster' tab in Exult Studio. |
| `unk` | A flag of unknown meaning. Exult ignores this flag, and it is safe to omit it. |

#### Return

Zero if there is no free tile near the avatar or the specified shape is not a valid monster shape; an object reference to the summoned monster otherwise.
