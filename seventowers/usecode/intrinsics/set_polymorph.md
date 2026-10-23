Makes an NPC take a different, temporary shape. The polymorphed shape is persistent across save games. The NPC can be returned to its normal shape by unsetting the NPC's `POLYMORPH` flag with a call to `clear_item_flag` intrinsic.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC to be polymorphed. |
| `shape` | The shape in 'SHAPES.VGA' that the NPC will take. |
