Brings a dead body back to life. If 'obj' is the body of an NPC, resurrects the NPC and returns a reference to the NPC; otherwise, returns a null ('0') reference.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The body that is to be resurrected. Monsters cannot be brought back to life in this manner, so it must be the body of a true NPC. This body will be deleted after the usecode ends, and all of its contents will be transferred to the resurrected NPC. |

#### Return

Zero if the supplied object was not the body of an NPC, otherwise an object reference to the resurrected NPC.

### Script Commands

There is also a script command with the same name and with a similar function. See '[resurrect](ucc_ref.php?TYPE=3&amp;DATAFILE=resurrect)' for more information.
