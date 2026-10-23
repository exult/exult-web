Makes the avatar lay down to sleep in the specified bed. What constitutes a bed is currently hard-coded (as of 2009/02/27). Once the avatar reaches the bed, Exult will call usecode function 0x622. If the bed is occupied, causes one of the party members to pop up and say so.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The bed where the avatar should sleep. This bed should be unoccupied. |
