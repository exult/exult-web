Sets the quantity of the desired object. The object's quantity is changed only if the object has it.

#### Parameters

| Parameter / value | Description |
| --- | --- |
| `obj` | The object whose quantity is to be changed. |
| `quant` | The desired value for the quantity. If this value is zero, the object will be deleted unless it is not in the game map -- likely because it has been created by Usecode but not yet placed. |

#### Return

Returns `true` if the object has a quantity, `false` otherwise.
