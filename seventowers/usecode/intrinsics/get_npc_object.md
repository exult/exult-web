Gets the NPC object references of one or more NPC numbers.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `npc` | The NPC number, or array of NPC numbers, whose object references are desired. |

#### Return

If the input is an array of NPC numbers, the return is an array of NPC object references. The output array places the NPC references in the same order they are in the input array.

Otherwise, the return is the object reference of the given NPC number.

Invalid entries resolve to null object references; array positions are preserved. An existing object reference is also accepted and returned unchanged, even when it refers to a non-NPC object.
