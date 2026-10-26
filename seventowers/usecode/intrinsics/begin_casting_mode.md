Makes an NPC display casting frames until the end of its next script.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC that should display casting frames. |
| `val` | The shape in 'SHAPES.VGA' to use as casting frames. Pass 859 for the standard casting frames. The implementation has a fallback of 859 for an absent second argument, but the current dispatcher pads omitted arguments with zero; pass 859 explicitly to obtain the standard frames. |
