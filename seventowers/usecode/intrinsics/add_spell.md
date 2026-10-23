Adds a spell to a spellbook.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `index` | The spell to be added. This index starts at zero, and must be in the 0-71 range. |
| `unk` | Reserved, must be zero. This is an unknown parameter from the original games; it doesn't seem to have any effects there, and is unused in Exult. You must still pass it to calls to this intrinsic, though. |
| `obj` | What spellbook the spell should be added to. |

#### Return

`false` if the supplied object is not a spellbook or if it already has the spell; `true` otherwise.
